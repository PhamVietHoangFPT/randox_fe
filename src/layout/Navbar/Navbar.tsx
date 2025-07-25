import React, { useState } from 'react'
import {
  Input,
  Typography,
  Flex,
  Space,
  Button,
  Modal,
  InputNumber,
  message,
  Form,
} from 'antd'
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
  PlusCircleOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons'
import './Navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import type { Wallet } from '../../types/wallet'
import { useDepositWalletMutation, useGetWalletBalanceQuery } from '../../features/wallet/walletAPI'
import { useCreatePaymentMutation } from '../../features/payment/paymentAPI'

const { Link, Text } = Typography

interface WalletBalanceResponse {
  data: {
    data: Wallet
  }
  isLoading: boolean
}

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') as string)
    : null

  const { data } = useGetWalletBalanceQuery<WalletBalanceResponse>(
    {}
  )
  const balance = data?.data?.balance
  const [addAmount] = useDepositWalletMutation()
  const [payment] = useCreatePaymentMutation()
  const handleLogout = () => {
    Cookies.remove('userData')
    Cookies.remove('userToken')
    navigate('/login')
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [number, setNumber] = useState<number | null>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log("Input number:", number);
    try {
      const response = await addAmount({ totalAmount: number }).unwrap()
      setIsModalOpen(false)
      message.success(response.message)
      const orderId = response.data.id
      const PaymentRes = await payment({ orderId }).unwrap()
      window.open(PaymentRes.paymentUrl, '_blank');
    } catch (error) {
      message.error("Failed to deposit wallet")
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const NavLinks = (
    <>
      <Link href='/RandomWheel' className='main-nav-link'>
        Lucky Draws
      </Link>
      <Link href='/sessions' className='main-nav-link'>
        Autions
      </Link>
    </>
  )

  return (
    <header className='navbar-container'>
      {/* === Main Nav === */}
      <div className='main-nav'>
        <Flex justify='space-between' align='center' wrap='wrap'>
          {/* Left: Logo and desktop nav */}
          <Flex align='center' gap='large'>
            <Link href='/' className='logo-link'>
              <div className='logo-placeholder'>
                <img src='/Logo.png' alt='Logo' className='logo-image' />
              </div>
            </Link>

            {/* Desktop Links */}
            <div className='desktop-nav-links'>
              <Space size='large'>{NavLinks}</Space>
            </div>
          </Flex>

          {/* Right: Search + icons */}
          <Flex align='center' gap='large'>
            <Input
              placeholder='Search'
              suffix={<SearchOutlined />}
              style={{ width: 250 }}
              className='nav-search'
            />
            <Space size='large' align='center'>
              <Link href='/cart' className='nav-icon-link'>
                <ShoppingOutlined className='nav-icon' />
              </Link>
              {userData ? (
                <Flex align='center' gap={8}>
                  <Link href='/transaction-history' className='nav-icon-link'>
                    <UserOutlined className='nav-icon' />
                  </Link>
                  <span style={{ fontWeight: 500 }}>
                    {balance?.toLocaleString()}₫
                  </span>
                  <span style={{ fontWeight: 500 }}>
                    <Button
                      onClick={showModal}>
                      <PlusCircleOutlined />
                    </Button>
                    <Button
                      onClick={handleLogout}>
                      <LogoutOutlined />
                    </Button>
                    <Modal
                      title="Deposit Wallet"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      okText="Confirm"
                      cancelText="Cancel"
                      centered
                      width={300} // để modal nhỏ
                      okButtonProps={{ disabled: number !== null && number < 50000 }}
                    >
                      <Form
                        name="depositForm"
                        initialValues={{ amount: number }}
                        onValuesChange={(changedValues) => {
                          if (changedValues.amount) {
                            setNumber(changedValues.amount);
                          }
                        }}
                      >
                        <Form.Item
                          name="amount"
                          rules={[
                            {
                              required: true,
                              message: 'Please input the amount!',
                            },
                            {
                              type: 'number',
                              min: 50000,
                              message: 'Amount must be at least 50,000₫!',
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: '100%' }}
                            placeholder="Enter amount"
                            value={number ?? undefined}
                          />
                        </Form.Item>
                      </Form>
                      <Text type="secondary" style={{ marginTop: 8, display: "block" }}>
                        Minimum amount is 50,000₫
                      </Text>

                    </Modal>
                  </span>
                </Flex>
              ) : (<Flex align='center' gap={8}>
                <Link href='/transaction-history' className='nav-icon-link'>
                  <UserOutlined className='nav-icon' />
                </Link>

                <Button
                  onClick={() => navigate('/login')}
                  type='primary'
                  size='middle'>
                  <LoginOutlined /> Login
                </Button>
              </Flex>)}
            </Space>
          </Flex>
        </Flex>
      </div>
    </header>
  )
}

export default Navbar
