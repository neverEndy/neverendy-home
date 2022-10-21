import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import style from './index.module.scss'

export interface INavLink {
  href: string
  children: React.ReactNode
  className?: string
}

const NavLink = ({
  href,
  children,
  className = ''
}: INavLink) => {
  return (
    <span className={classNames(style.Root, className)}>
      <Link href={href}>
        { children }
      </Link>
    </span>
  )
}

export default NavLink
