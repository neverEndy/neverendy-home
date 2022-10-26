import { useRouter } from 'next/router'
import React, { useState } from 'react'
import TextField from '../../../components/TextField'
import useBlogCategories from '../../../hooks/api/useBlogCategories'
import { CreateBlogOption } from '../../../libs/controller/blogs'
import RichTextEditor from '../RichText/Editor'
import style from './index.module.scss'

const BlogCreator = () => {
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [category, setCategory] = useState('')
  const { data: categories, isLoading: isCategoriesLoading } = useBlogCategories()
  const router = useRouter()

  const createBlog = async (option: CreateBlogOption) => {
    const fetchOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(option)
    }
    const resp = await fetch('http://localhost:3000/neverendy-home/api/blogs', fetchOptions)
    const newBlog = await resp.json()
    return newBlog
  }

  const handleCreate = async () => {
    const options: CreateBlogOption = {
      title,
      subtitle,
      author,
      tags: tags.toString(),
      content: markdown,
      category
    }
    await createBlog(options)
    router.push('/Admin/MyBlog')
  }
  return (
    <div className={style.Root}>
      <span>BlogCreator</span>
      <form className={style.Form} onSubmit={e => e.preventDefault()}>
        <TextField className={style.FieldItem} type="text" label='標題' value={title} onChange={e => setTitle(e.target.value)}/>
        <TextField className={style.FieldItem} type="text" label='子標題' value={subtitle} onChange={e => setSubtitle(e.target.value)} />
        <TextField className={style.FieldItem} type="text" label='作者' value={author} onChange={e => setAuthor(e.target.value)} />
        <TextField list='categories' className={style.FieldItem} type="text" label='目錄' value={category} onChange={e => setCategory(e.target.value)} />
        <datalist id='categories'>
          {
            categories?.map(cat => (
              <option key={cat} value={cat}></option>
            ))
          }
        </datalist>
        <RichTextEditor value={markdown} onChange={e => setMarkdown(e)} />
        <button type='button' onClick={() => handleCreate()}>create</button>
      </form>
    </div>
  )
}

export default BlogCreator
