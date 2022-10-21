import React from 'react'
import Link from 'next/link'
import style from './index.module.scss'

const SideBar = () => {
  return (
    <aside className={style.Root}>
      <span className={style.BarItem}>
        <Link href='/Admin'>Admin</Link>
      </span>
      <span className={style.BarItem}>
        <Link href='/Admin/MyBlog'>My Blog</Link>
      </span>
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
