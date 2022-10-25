import '../styles/globals.css'
import '../styles/index.scss'
import Layout from '../layout'
import type { AppProps } from 'next/app'
import AdminGuard from '../context/AdminGuard'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AdminGuard acceptMode='development'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AdminGuard>
  )
}

export default MyApp
