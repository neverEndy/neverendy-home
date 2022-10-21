import React, { useCallback, useState } from 'react'
import style from './index.module.scss'
import 'github-markdown-css'
import classNames from 'classnames'

const markdown = require('markdown').markdown

const RichTextEditor = () => {
  const [value, setValue] = useState('')
  const onChange = useCallback((value: string) => {
    setValue(value)
  }, [])
  return (
    <div className={style.Root}>
      <div  className={style.Toolbar}></div>
      <textarea
        className={style.MarkdownInput}
        value={value}
        onChange={(e) => onChange(e.target.value)} />
      <div className={classNames(style.MarkdownPreview, 'markdown-body')} dangerouslySetInnerHTML={{ __html: markdown.toHTML(value) }}></div>
    </div>
  )
}

export default RichTextEditor
