import React from 'react'
import style from './index.module.scss'
import Navbar from './Navbar'

interface ILayout {
  children: React.ReactNode
}

const Layout = ({
  children
}: ILayout) => {
  return (
    <div className={style.Container}>
      <Navbar />
      {
        children
      }
    </div>
  )
}

export default Layout
