import React from 'react'
import NavLink from '../../components/Button/NavLink'
import style from './index.module.scss'

const Navbar = () => {
  return (
    <header className={style.Root}>
      <NavLink href='/Blog'>Blog</NavLink>
    </header>
  )
}

export default Navbar