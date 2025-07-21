/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useGetSessionDetailQuery,
  usePlaceBidMutation,
} from '../../features/auction/auctionAPI'
import {
  notification,
  Button,
  Form,
  InputNumber,
  Statistic,
  List,
  Avatar,
  Typography,
  Card,
  Tag,
} from 'antd'
import {
  connectToAuctionHub,
  disconnectFromAuctionHub,
} from '../../realtime/auctionHub'
import {
  ClockCircleOutlined,
  TrophyOutlined,
  DollarOutlined,
} from '@ant-design/icons'
import './DetailSession.css'

const { Countdown } = Statistic
const { Text, Title } = Typography

interface Bid {
  id: string
  amount: number
  createdAt: string
  userId: string
  user?: {
    email: string
  }
}

const DetailSession: React.FC = () => {
  const { id: sessionId } = useParams<{ id: string }>()
  const { data, isLoading, error, refetch } = useGetSessionDetailQuery(
    sessionId!
  )

  const [placeBid] = usePlaceBidMutation()
  const [api, contextHolder] = notification.useNotification()
  const [isExpired, setIsExpired] = useState(false)
  const [endTime, setEndTime] = useState<number | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)

  const [form] = Form.useForm()

  useEffect(() => {
    if (data?.session?.endTime) {
      setEndTime(new Date(data.session.endTime).getTime())
    }
  }, [data])

  useEffect(() => {
    if (!sessionId || sessionId === 'undefined') return

    connectToAuctionHub(
      sessionId,
      (newEndTime) => {
        const extended = new Date(newEndTime).getTime()
        setEndTime(extended)
        api.info({
          message: 'Session extended by 5 minutes',
        })
      },
      (error: any) => {
        api.error({
          message: 'Auction connection error',
          description: error?.message || 'An error occurred while connecting.',
        })
      },
      () => { }
    )

    return () => {
      disconnectFromAuctionHub(sessionId)
    }
  }, [sessionId, api])

  const openNotification = (type: 'success' | 'error', message: string) => {
    api[type]({
      message: type === 'success' ? 'Success' : 'Error',
      description: message,
      duration: 3,
      placement: 'topRight',
    })
  }

  const onFinish = async (values: any) => {
    try {
      await placeBid({
        sessionId: sessionId!,
        amount: values.bidPrice,
      }).unwrap()
      openNotification('success', 'Bid placed successfully!')

      form.resetFields()
      refetch()
    } catch (err: any) {
      openNotification('error', err?.data || 'Failed to place bid!')
    }
  }

  if (isLoading)
    return <div className='loading-container'>Loading auction session...</div>
  if (error || !data?.session)
    return <div className='error-container'>Auction session not found.</div>

  const session = data.session
  const item = session.auctionItem
  const bids: Bid[] = (data.bids || [])
    .slice()
    .sort(
      (a: Bid, b: Bid) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

  const highestBid =
    bids.length > 0 ? Math.max(...bids.map((b) => b.amount)) : null
  const stepPrice = data?.session?.auctionItem?.stepPrice || null

  const paginatedBids = bids.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className='auction-container'>
      {contextHolder}

      <div className='auction-header'>
        <Title level={1} className='auction-title'>
          {item?.name}
        </Title>
      </div>

      <div className='auction-content'>
        <div className='auction-main'>
          <Card className='item-card'>
            <div style={{ display: 'flex' }}>
              <div className='item-image-container'>
                <img
                  src={item?.imageUrl || '/no-image.png'}
                  alt='Product Image'
                  className='item-image'
                />
                <p>
                  <Text className='item-description'>{item?.description}</Text>
                </p>
              </div>
              <div className='item-details'>
                <div className='price-info'>
                  <div className='price-item'>
                    <DollarOutlined className='price-icon' />
                    <span>
                      Starting Price: <>{item?.startPrice?.toLocaleString()}₫</>
                    </span>
                  </div>
                  <div className='price-item'>
                    <TrophyOutlined className='price-icon' />
                    <span>
                      Reserve Price: <>{item?.reservePrice?.toLocaleString()}₫</>
                    </span>
                  </div>
                  <div className='price-item'>
                    <span>
                      Step: <>{item?.stepPrice?.toLocaleString()}₫</>
                    </span>
                  </div>
                  <div className='countdown-section'>
                    <ClockCircleOutlined className='countdown-icon' />
                    <Text className='countdown-label'>Time left:</Text>
                    {endTime && !isExpired ? (
                      <Countdown
                        value={endTime}
                        format='HH:mm:ss'
                        onFinish={() => setIsExpired(true)}
                        className='countdown-timer'
                      />
                    ) : (
                      <Tag color='red' className='expired-tag'>
                        Auction has ended
                      </Tag>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className='bid-form-card'>
            <Title level={3} className='bid-form-title'>
              Place Your Bid
            </Title>
            <Form
              name='bidForm'
              onFinish={onFinish}
              layout='vertical'
              className='bid-form'
              form={form}
            >
              <Form.Item
                label='Bid Price (VND)'
                name='bidPrice'
                rules={[
                  { required: true, message: 'Enter your bid!' },
                  {
                    type: 'number',
                    min: (highestBid ?? 0) + (stepPrice ?? 0),
                    message: `Bid must be at least ${((highestBid ?? 0) + (stepPrice ?? 0)).toLocaleString()}₫`,
                  },
                ]}
              >
                <InputNumber
                  min={item?.startPrice}
                  className='bid-input'
                  disabled={isExpired}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) => value!.replace(/(,*)/g, '')}
                  placeholder='Enter amount'
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={isExpired}
                  className='bid-button'
                  size='large'
                >
                  Place Bid
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>

        <div className='auction-sidebar'>
          <Card className='bids-card'>
            <Title level={3} className='bids-title'>
              Bid History
            </Title>
            <List
              itemLayout='horizontal'
              dataSource={paginatedBids}
              locale={{ emptyText: 'No bids yet.' }}
              className='bids-list'
              renderItem={(bid) => {
                const isHighest = bid.amount === highestBid
                return (
                  <List.Item
                    className={`bid-item ${isHighest ? 'highest-bid' : ''}`}
                  >
                    <List.Item.Meta
                      avatar={
                        <Avatar className='bid-avatar'>
                          {bid.user?.email?.charAt(0).toUpperCase() || '?'}
                        </Avatar>
                      }
                      title={
                        <div className='bid-user'>
                          {bid.user?.email || 'Anonymous'}
                          {isHighest && (
                            <Tag color='gold' className='highest-tag'>
                              Highest Bid
                            </Tag>
                          )}
                        </div>
                      }
                      description={
                        <div className='bid-info'>
                          <div className='bid-amount'>
                            {bid.amount.toLocaleString()} ₫
                          </div>
                          <div className='bid-time'>
                            {new Date(bid.createdAt).toLocaleString('en-GB')}
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )
              }}
              pagination={{
                current: currentPage,
                pageSize,
                total: bids.length,
                onChange: (page) => setCurrentPage(page),
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DetailSession
