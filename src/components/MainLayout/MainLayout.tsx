import { Layout, theme } from 'antd'
import styles from './MainLayout.module.scss'
import { Navbar } from '../Navbar'

const { Header, Content, Footer } = Layout

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout>
      <Header className={styles.header}>
        <Navbar />
      </Header>
      <Content className={styles.mainContent}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer className={styles.footer}>
        Avito Tech ©{new Date().getFullYear()} Created by Rufat Safiullin
      </Footer>
    </Layout>
  )
}
