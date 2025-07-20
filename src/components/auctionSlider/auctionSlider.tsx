/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import './auctionSlider.css'
import { Card, Carousel, Tag } from 'antd'
import type { Auctions } from '../../types/auction'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

interface AuctionCardSliderProps {
  auctions: Auctions[] | any // fallback type any để tránh lỗi TS lúc chưa rõ as
}

const AuctionSlider: React.FC<AuctionCardSliderProps> = ({ auctions }) => {
  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
  }

  const navigate = useNavigate()

  const handleCardClick = (id: string) => {
    navigate(`/sessions/${id}`)
  }

  // Fallback nếu auctions không phải mảng
  if (!Array.isArray(auctions)) {
    console.warn('auctions is not an array:', auctions)
    return null
  }

  return (
    <div style={{ padding: '16px' }}>
      <Carousel autoplay dots>
        {auctions.map((auction) => (
          <div key={auction.id}>
            <Card
              hoverable
              style={{
                margin: '0 8px',
                marginTop: '5px',
                marginBottom: '5px',
                borderRadius: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                position: 'relative',
                background: 'transparent',
              }}
              onClick={() => handleCardClick(auction.id)}
            >
              <Card.Meta
                title={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={auction?.auctionItem?.imageUrl}
                      alt={auction?.auctionItem?.name}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                }
                description={
                  <div style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        color: '#000',
                        margin: '8px 0',
                        fontWeight: 'bold',
                      }}
                    >
                      {truncateName(auction.auctionItem.name, 20)}
                    </p>
                    <p>
                      <Tag color="#3F51B5">
                        <span
                          style={{
                            fontStyle: 'italic',
                            fontSize: '14px',
                          }}
                        >
                          Start price:{' '}
                          {auction?.auctionItem?.startPrice.toLocaleString(
                            'vi-VN'
                          )}
                          đ
                        </span>
                      </Tag>
                    </p>
                    <Tag color="#AB47BC">
                      <span
                        style={{
                          fontStyle: 'italic',
                          fontSize: '14px',
                        }}
                      >
                        Reserve price:{' '}
                        {auction?.auctionItem?.reservePrice.toLocaleString(
                          'vi-VN'
                        )}
                        đ
                      </span>
                    </Tag>
                    {auction.endTime && (
                      <p style={{ color: '#d4a017', margin: '4px 0' }}>
                        End time:{' '}
                        {moment(auction?.endTime).format('DD/MM/YYYY HH:mm')}
                      </p>
                    )}
                  </div>
                }
              />
            </Card>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default AuctionSlider
