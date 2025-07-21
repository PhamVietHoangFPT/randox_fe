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
            <img src='/src/assets/vnpay.jpg' alt='vnpay' height={30} />
            <img src='/src/assets/cash.jpg' alt='cash' height={30} />
          </div>
          <Title level={4} style={{ color: 'white', marginTop: 20 }}>
            Shipping Providers
          </Title>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <img src='/src/assets/spx.png' alt='spx' height={30} />
            <img src='/src/assets/jt.png' alt='jt' height={30} />
            <img src='/src/assets/viettel.jpg' alt='viettel' height={30} />
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;