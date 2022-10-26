import classNames from 'classnames'
import React from 'react'
import BlogListItem, { IBlogListItemActions, IBlogListItemProps } from './BlogListItem'
import style from './index.module.scss'

export interface IBlogListProps extends Partial<IBlogListItemActions>  {
  values: IBlogListItemProps[]
  className?: string
}

const BlogList = ({
  values,
  onDelete = () => null,
  className = ''
}: IBlogListProps) => {
  
  return (
    <div className={classNames(style.Root, className)}>
      {
        values.map(blog => (
          <BlogListItem key={blog.id} {...blog} onDelete={onDelete}/>
        ))
      }
    </div>
  )
}

export default BlogList
