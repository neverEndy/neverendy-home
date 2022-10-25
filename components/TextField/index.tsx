import React from 'react'
import FieldGroup, { IFieldGroupProps } from '../FieldGroup'
import style from './index.module.scss'

export interface ITextFieldProps extends Omit<IFieldGroupProps, 'children'> {
  className?: string
  type?: React.HTMLInputTypeAttribute
  value: string | number
  placeholder?: string
  onChange: React.InputHTMLAttributes<HTMLInputElement>['onChange']
}

const TextField = ({
  className = '',
  label,
  type = 'text',
  value,
  placeholder,
  onChange = () => null
}: ITextFieldProps) => {
  return (
    <FieldGroup className={className} label={label}>
      <input className={style.Input} type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </FieldGroup>
  )
}

export default TextField