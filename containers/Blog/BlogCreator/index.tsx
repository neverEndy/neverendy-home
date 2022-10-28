import { useRouter } from 'next/router'
import React from 'react'
import { CreateBlogOption } from '../../../libs/controller/blogs'
import BlogForm from '../BlogForm'
import style from './index.module.scss'

const BlogCreator = () => {
  const router = useRouter()

  const handleCreateBlog = async (option: CreateBlogOption) => {
    const fetchOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(option)
    }
    try {
      await fetch('http://localhost:3000/neverendy-home/api/blogs', fetchOptions)
      router.push('/Admin/MyBlog')
    } catch (err) {
      alert('failed to create blog')
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
    <div className={style.Root}>
      <span>BlogCreator</span>
      <BlogForm action='create' onSubmit={handleCreateBlog} onUploadImage={handleImageUpload}/>
    </div>
  )
}

export default BlogCreator
