import React, { useState } from 'react'
import TextField from '../../../components/TextField'
import { CreateBlogOption } from '../../../libs/controller/blogs'
import RichTextEditor from '../RichText/Editor'
import style from './index.module.scss'

const BlogCreator = () => {
  const [markdown, setMarkdown] = useState('')
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [author, setAuthor] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const createBlog = async (option: CreateBlogOption) => {
    const fetchOptions: RequestInit = {
      method: 'POST',
      body: JSON.stringify(option)
    }
    const resp = await fetch('http://localhost:3000/neverendy-home/api/blogs', fetchOptions)
    const newBlog = await resp.json()
    return newBlog
  }

  const handleCreate = () => {
    const options: CreateBlogOption = {
      title,
      subtitle,
      author,
      tags: tags.toString(),
      content: markdown
    }
    console.log(options)
    createBlog(options)
  }
  return (
    <div className={style.Root}>
      <span>BlogCreator</span>
      <form className={style.Form} onSubmit={e => e.preventDefault()}>
        <TextField className={style.FieldItem} type="text" label='標題' value={title} onChange={e => setTitle(e.target.value)}/>
        <TextField className={style.FieldItem} type="text" label='子標題' value={subtitle} onChange={e => setSubtitle(e.target.value)} />
        <TextField className={style.FieldItem} type="text" label='作者' value={author} onChange={e => setAuthor(e.target.value)} />
        <TextField className={style.FieldItem} type="text" label='標籤' value={tags.toString()} onChange={e => setTags(String(e.target.value).split(','))} />
        <RichTextEditor value={markdown} onChange={e => setMarkdown(e)} />
        <button type='button' onClick={() => handleCreate()}>create</button>
      </form>
    </div>
  )
}

export default BlogCreator
