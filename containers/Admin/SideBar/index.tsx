import React from 'react'
import Link from 'next/link'
import style from './index.module.scss'

const SideBar = () => {
  return (
    <aside className={style.Root}>
      <Link href='/Admin'><a className={style.BarItem}>Admin</a></Link>
      <Link href='/Admin/MyBlog'><a className={style.BarItem}>My Blog</a></Link>
    </aside>
  )
}

export const withSideBar = <P extends object>(Component: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    return (
      <main style={{ display: 'flex' }}>
        <SideBar />
        <section style={{ flex: 1 }}>
          <Component {...props} />
        </section>
      </main>
    )
  }
  return Wrapper
}

export default SideBar
