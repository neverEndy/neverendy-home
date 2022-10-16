import React from 'react'
import Link from 'next/link'
import style from './index.module.scss'

export interface INavLink {
  href: string
  children: React.ReactNode
}

const NavLink = ({
  href,
  children
}: INavLink) => {
  return (
    <span className={style.Root}>
      <Link href={href}>
        { children }
      </Link>
    </span>
  )
}

export default NavLink
