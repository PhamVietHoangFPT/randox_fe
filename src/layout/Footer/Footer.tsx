import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer
      style={{
        background: 'linear-gradient(to bottom, #1e90ff, #2596be)',
        color: 'white',
        padding: '50px 80px',
      }}
    >
      <Row justify='space-between' gutter={[32, 32]}>
        {/* Column 1: Logo + Contact */}
        <Col xs={24} md={6}>
          <img src='/Logo.png' alt='RandoX' height={50} />
          <div style={{ marginTop: 16 }}>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'red', marginRight: 8 }}>📞</span>
              <Text style={{ color: 'white' }}>xxxxxxxxxx</Text>
            </p>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 8 }}>📧</span>
              <Text style={{ color: 'white' }}>RandoX@gmail.com</Text>
            </p>
          </div>
        </Col>

        {/* Column 2: Policies */}
        <Col xs={24} md={6}>
          <Title level={4} style={{ color: 'white' }}>
            Policies
          </Title>
          <ul style={{ listStyle: 'none', padding: 0, color: 'white' }}>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
          </ul>
        </Col>

        {/* Column 3: Regulations */}
        <Col xs={24} md={6}>
          <Title level={4} style={{ color: 'white' }}>
            Operating Regulations
          </Title>
          <ul style={{ listStyle: 'none', padding: 0, color: 'white' }}>
            <li>Delivery Guide</li>
            <li>Payment Guide</li>
            <li>Auction Guide</li>
            <li>Terms of Service</li>
          </ul>
        </Col>

        {/* Column 4: Payment + Shipping */}
        <Col xs={24} md={6}>
          <Title level={4} style={{ color: 'white' }}>
            Payment
          </Title>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <img src='https://play-lh.googleusercontent.com/B1Zi8JrNjFjZKOQ2b5O8M-Or2uY3pSWZa-6-XnDMJ8YTFesdJRsIFhd1KxpqV0f2kg=w480-h960-rw' alt='vnpay' height={30} />
            <img src='https://imgs.search.brave.com/rwSJ7tBCFo6m08_s9fNvcH5DEV0G_tMRV5K1U8CwyWQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8yMDIxLzIwMjE2/ODYucG5nP3NlbXQ9/YWlzX2h5YnJpZA' alt='cash' height={30} />
          </div>
          <Title level={4} style={{ color: 'white', marginTop: 20 }}>
            Shipping Providers
          </Title>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <img src='https://imgs.search.brave.com/wSyJ_3zSAV5cQ2G1YHi8K7MQ6h9h28TkzwLD8JKyUAQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/NHRyYWNraW5nLm5l/dC9saWIvaW1nL2Nh/cnJpZXJzL3Nob3Bl/ZS1leHByZXNzLnN2/Zw' alt='spx' height={30} />
            <img src='https://imgs.search.brave.com/eTKxDTIJWU4gZ3kWHcpgi65Y5f6Fp5fqFKEANzttw4I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/NHRyYWNraW5nLm5l/dC9saWIvaW1nL2Nh/cnJpZXJzL2otdC1l/eHByZXNzLnN2Zw' alt='jt' height={30} />
            <img src='https://imgs.search.brave.com/AmeNEm1XwTQzhdzZUjfH9M81CpLMEyuwlftDoxJy2qg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9TdDVEMFNncWZs/aDIzMHRUcGhSeGE2/UUw3U2IweWtUSjZo/OXp2RnU4X0ZLTDBW/WkdBSnc2QUdteTRH/Q2M1alJxU0E9dzI0/MC1oNDgwLXJ3' alt='viettel' height={30} />
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;