import React from 'react'
import classNames from 'classnames'
import style from './index.module.scss'

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(({
    children,
    className,
    ...props
  },
  ref) => {
  return (
    <button ref={ref} className={classNames(style.Root, className)} {...props}>{children}</button>
  )
})

Button.displayName = 'Button'
export default Button
