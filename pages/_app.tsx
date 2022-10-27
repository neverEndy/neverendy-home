import '../styles/globals.css'
import '../styles/index.scss'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Layout from '../layout'
import AdminGuard from '../context/AdminGuard'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

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
