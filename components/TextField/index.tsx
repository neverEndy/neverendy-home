import React from 'react'
import FieldGroup, { IFieldGroupProps } from '../FieldGroup'
import style from './index.module.scss'

export interface ITextFieldProps extends Omit<IFieldGroupProps, 'children'>, React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: React.HTMLInputTypeAttribute
  value: string | number
  placeholder?: string
}

const TextField = ({
  className = '',
  label,
  type = 'text',
  value,
  placeholder,
  onChange = () => null,
  ...rest
}: ITextFieldProps) => {
  return (
    <FieldGroup className={className} label={label}>
      <input className={style.Input} type={type} placeholder={placeholder} onChange={onChange} value={value} {...rest}/>
    </FieldGroup>
  )
}

export default TextField