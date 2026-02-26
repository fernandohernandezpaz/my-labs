import { useMemo } from 'react';
import { Layout, Menu, Button, Typography, Grid } from 'antd';
import {
  AppstoreOutlined,
  CarOutlined,
  DeploymentUnitOutlined,
  LogoutOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { clearStoredToken } from '@/features/auth/hooks/use-auth';
import { ROUTES } from '@/shared/constants/routes';

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();

  const selected = useMemo(() => {
    if (location.pathname.startsWith('/admin/brands')) return ['brands'];
    if (location.pathname.startsWith('/admin/models')) return ['models'];
    if (location.pathname.startsWith('/admin/products')) return ['products'];
    return ['dashboard'];
  }, [location.pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={screens.md ? 80 : 0}
        style={{ background: '#fff', borderRight: '1px solid #dcdfe6' }}
      >
        <div style={{ padding: 16, textAlign: 'center' }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Element Admin
          </Typography.Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={selected}
          items={[
            { icon: <AppstoreOutlined />, key: 'dashboard', label: <Link to={ROUTES.admin}>Dashboard</Link> },
            { icon: <ShopOutlined />, key: 'brands', label: <Link to={ROUTES.brands}>Brands</Link> },
            { icon: <CarOutlined />, key: 'models', label: <Link to={ROUTES.models}>Models</Link> },
            { icon: <DeploymentUnitOutlined />, key: 'products', label: <Link to={ROUTES.products}>Products</Link> },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            alignItems: 'center',
            background: '#fff',
            borderBottom: '1px solid #dcdfe6',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <Typography.Text strong>Admin Panel</Typography.Text>
          <Button
            icon={<LogoutOutlined />}
            onClick={() => {
              clearStoredToken();
              navigate(ROUTES.login, { replace: true });
            }}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ padding: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
