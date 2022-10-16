import React from 'react'
import NavLink from '../../components/Button/NavLink'
import style from './index.module.scss'

const Navbar = () => {
  return (
    <div className={style.Root}>
      <NavLink href='/Blog'>Blog</NavLink>
    </div>
  )
}

export default Navbar