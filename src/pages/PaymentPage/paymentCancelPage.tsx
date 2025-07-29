import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Typography } from 'antd'
import './paymentPage.css'
const { Title, Text } = Typography

const PaymentCancelPage: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Card
            style={{ maxWidth: 500, margin: '40px auto', textAlign: 'center' }}
            className='payment-container'
        >
            <>
                <Title level={3}>❌ Payment Failed</Title>
                <Text>Your transaction was not successful. Please try again.</Text>
            </>
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

export default PaymentCancelPage
