import React, { useCallback, useState } from 'react'
import style from './Editor.module.scss'
import 'github-markdown-css'
import classNames from 'classnames'
import RichTextViewer from './Viewer'

const markdown = require('markdown').markdown

export interface IRichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

const RichTextEditor = ({
  value,
  onChange
}: IRichTextEditorProps) => {
  return (
    <div className={style.Root}>
      <div  className={style.Toolbar}></div>
      <textarea
        className={style.MarkdownInput}
        value={value}
        onChange={(e) => onChange(e.target.value)} />
      <RichTextViewer value={value}/>
    </div>
  )
}

export default RichTextEditor
