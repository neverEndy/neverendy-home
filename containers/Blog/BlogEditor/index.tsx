import { useRouter } from 'next/router'
import React from 'react'
import { CreateBlogOption } from '../../../libs/controller/blogs'
import { APIGetBlogByIdResponse } from '../../../pages/api/blogs/[id]'
import BlogForm, { IBlogFormProps } from '../BlogForm'

export interface IBlogEditorProps {
  blog: APIGetBlogByIdResponse
}

const BlogEditor = ({
  blog
}: IBlogEditorProps) => {
  const router = useRouter()
  const defaultBlog: IBlogFormProps['defaultBlog'] = {
    ...blog,
    content: blog.article.content
  }

  const handleUpdateBlog = async (updatedBlog: CreateBlogOption) => {
    const fetchOptions: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify(updatedBlog)
    }
    try {
      await fetch(`http://localhost:3000/neverendy-home/api/blogs/${blog.id}`, fetchOptions)
      router.push('/Admin/MyBlog')
    } catch (err) {
      alert('failed to update blog')
    }
  }
  return (
    <div>
      <span>editor</span>
      <BlogForm action='save' defaultBlog={defaultBlog} onSubmit={handleUpdateBlog}/>
    </div>
  )
}

export default BlogEditor
