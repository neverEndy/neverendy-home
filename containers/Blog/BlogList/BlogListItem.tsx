import Link from 'next/link'
import React from 'react'
import Button from '../../../components/Button'
import InfoRow, { IInfoRowProps } from '../../../components/InfoRow'
import { BlogModel } from '../../../libs/dao/Blogs'

export interface IBlogListItemActions {
  onDelete: (id: string) => void
}

export interface IBlogListItemProps extends BlogModel {
  disabledActions?: boolean
}

const BlogListItem = ({
  title,
  id,
  disabledActions = false,
  onDelete,
  ...blog
}: IBlogListItemProps & IBlogListItemActions) => {
  const basicInfo: Omit<IInfoRowProps, 'actions' | 'children'> = {
    title,
    href: `/Blog/${id}`
  }

  const Actions = () => {
    if (disabledActions) return null
    return (
      <>
        <Link href={`/Admin/MyBlog/CreateOrEdit?type=edit&id=${id}`}>
          <a><Button>Edit</Button></a>
        </Link>
        <Button onClick={() => onDelete(id)}>Delete</Button>
      </>
    )
  }
  return (
    <InfoRow
      {...basicInfo}
      actions={<Actions />}
      footer={
        <>
          <span>作者: {blog.author}</span>
          <span>created time: {new Date(blog.createdDate).toLocaleString()}</span>
          <span>edited time: {new Date(blog.editDate).toLocaleString()}</span>
        </>
      }>
        <span>ID: {Array.from(id).slice(0, 8).join('')}</span>
        <span>子標: {blog.subtitle}</span>
    </InfoRow>
  )
}

export default BlogListItem
