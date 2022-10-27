import React, { useState } from 'react'
import TextField from '../../../components/TextField'
import useBlogCategories from '../../../hooks/api/useBlogCategories'
import { CreateBlogOption } from '../../../libs/controller/blogs'
import RichTextEditor from '../RichText/Editor'
import style from './index.module.scss'

export interface IBlogFormProps {
  defaultBlog?: CreateBlogOption
  action: 'create' | 'save'
  onSubmit: (blog: CreateBlogOption) => void
}

const BlogForm = ({
  defaultBlog,
  action,
  onSubmit
}: IBlogFormProps) => {
  const [markdown, setMarkdown] = useState(defaultBlog?.content || '')
  const [title, setTitle] = useState(defaultBlog?.title || '')
  const [subtitle, setSubtitle] = useState(defaultBlog?.subtitle || '')
  const [author, setAuthor] = useState(defaultBlog?.author || '')
  const [tags, setTags] = useState<string[]>(defaultBlog?.tags.split(',') || [])
  const [category, setCategory] = useState(defaultBlog?.category || '')
  const { data: categories } = useBlogCategories()

  const handleCreate = async () => {
    const options: CreateBlogOption = {
      title,
      subtitle,
      author,
      tags: tags.toString(),
      content: markdown,
      category
    }
    onSubmit(options)
  }
  return (
    <div className={style.Root}>
      <form className={style.Form} onSubmit={e => e.preventDefault()}>
        <TextField className={style.FieldItem} type="text" label='標題' value={title} onChange={e => setTitle(e.target.value)}/>
        <TextField className={style.FieldItem} type="text" label='子標題' value={subtitle} onChange={e => setSubtitle(e.target.value)} />
        <TextField className={style.FieldItem} type="text" label='作者' value={author} onChange={e => setAuthor(e.target.value)} />
        <TextField className={style.FieldItem} type="text" label='標籤' value={tags.toString()} onChange={e => setTags(e.target.value.split(','))} />
        <TextField list='categories' className={style.FieldItem} type="text" label='目錄' value={category} onChange={e => setCategory(e.target.value)} />
        <datalist id='categories'>
          {
            categories?.map(cat => (
              <option key={cat} value={cat}></option>
            ))
          }
        </datalist>
        <RichTextEditor value={markdown} onChange={e => setMarkdown(e)} />
        <button type='button' onClick={() => handleCreate()}>{action}</button>
      </form>
    </div>
  )
}

export default BlogForm
