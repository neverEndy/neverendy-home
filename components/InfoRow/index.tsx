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
            ? <Link href={href}><a className={style.HeaderTitle}><h3>{title}</h3></a></Link>
            : <h3 className={style.HeaderTitle}>{title}</h3>
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
