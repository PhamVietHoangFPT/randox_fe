import React, { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCreatePurchasePaymentHistoryMutation } from '../../features/payment/paymentAPI'
import { Button, Card, message, Typography } from 'antd'
import './paymentPage.css'
import { useClearCartMutation } from '../../features/cart/cartAPI'
const { Title, Text } = Typography

const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [createPurchasePaymentHistory] =
    useCreatePurchasePaymentHistoryMutation()
  const [clearCart] = useClearCartMutation()

  const rawData = useMemo(() => Object.fromEntries(searchParams.entries()), [searchParams])

  console.log('🔍 VNPay Query Params:', rawData)


  const payload = useMemo(() => {
    return {
      ...rawData,
      cancel: rawData.cancel === 'true', // ép kiểu boolean
    }
  }, [rawData])

  useEffect(() => {
    const reponse = createPurchasePaymentHistory(payload)
      .unwrap()
      .then(() => {
        // Xoá giỏ hàng sau khi thanh toán thành công
        clearCart({}).unwrap()
      })
      .catch((err) => {
        console.error('❌ Không thể lưu trạng thái thanh toán:', err)
        message.error('Không thể cập nhật trạng thái thanh toán')
      })
    console.log(reponse)
  }, [payload])

  return (
    <Card
      style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}
      className='payment-container'
    >
      <div>
        <Title level={3}>🎉 Order purchased successfully!</Title>
        <Text>We have received your order. Thank you !</Text>
      </div>
      <Button
        type='primary'
        onClick={() => navigate('/')}
        style={{ marginTop: 24 }}
        className='return-button'
      >
        Back To Home
      </Button>
    </Card>
  )
}

export default PaymentPage
