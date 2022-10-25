import Link from 'next/link'
import React from 'react'
import style from './index.module.scss'

export interface IInfoRowProps {
  actions: React.ReactNode
  href: string
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}

const InfoRow = ({
  actions,
  href,
  title,
  children,
  footer
}: IInfoRowProps) => {
  return (
    <article className={style.Root}>
      <div className={style.Header}>
        {
          href
            ? <Link href={href}><a className={style.HeaderTitle}>{title}</a></Link>
            : <a className={style.HeaderTitle}>{title}</a>
        }
        <span className={style.HeaderActions}>{ actions }</span>
      </div>
      <div className={style.Description}>
        { children }
      </div>
      <div className={style.Footer}>
        { footer }
      </div>
    </article>
  )
}

export default InfoRow
