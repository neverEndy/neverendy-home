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
    article: blog.article
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

  const handleImageUpload = async (base64: string) => {
    const fetchOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ base64 })
    }
    try {
      const resp = await fetch('http://localhost:3000/neverendy-home/api/images/', fetchOptions)
      const { fileName } = await resp.json()
      return fileName
    } catch (err) {
      alert('failed to upload image')
    }
  }
  return (
    <div>
      <span>editor</span>
      <BlogForm action='save' defaultBlog={defaultBlog} onSubmit={handleUpdateBlog} onUploadImage={handleImageUpload}/>
    </div>
  )
}

export default BlogEditor
