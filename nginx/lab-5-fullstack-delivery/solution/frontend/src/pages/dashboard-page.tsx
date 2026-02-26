import { Card, Col, Row, Statistic, Typography } from 'antd';

export const DashboardPage = () => (
  <div>
    <Typography.Title level={3}>Dashboard</Typography.Title>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="Brands" valueRender={() => <span>Manage in module</span>} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="Models" valueRender={() => <span>Manage in module</span>} />
        </Card>
      </Col>
      <Col xs={24} md={8}>
        <Card>
          <Statistic title="Products" valueRender={() => <span>Manage in module</span>} />
        </Card>
      </Col>
    </Row>
  </div>
);
