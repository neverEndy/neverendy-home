import React from 'react'
import BlogListItem, { IBlogListItemActions, IBlogListItemProps } from './BlogListItem'
import style from './index.module.scss'

export interface IBlogListProps extends Partial<IBlogListItemActions>  {
  values: IBlogListItemProps[]
}

const BlogList = ({
  values,
  onDelete = () => null
}: IBlogListProps) => {
  return (
    <div className={style.Root}>
      {
        values.map(blog => (
          <BlogListItem key={blog.id} {...blog} onDelete={onDelete}/>
        ))
      }
    </div>
  )
}

export default BlogList
