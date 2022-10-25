import React from 'react'
import style from './index.module.scss'
import classNames from 'classnames'

export interface IFieldGroupProps {
  className?: string
  label?: string
  children: React.ReactNode
}

const FieldGroup = ({
  className,
  label,
  children
}: IFieldGroupProps) => {
  return (
    <div className={classNames(style.Root, className)}>
      {label && <label className={style.Label}>{label}</label>}
      {children}
    </div>
  )
}

export default FieldGroup