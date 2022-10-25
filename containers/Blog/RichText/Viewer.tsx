import React from 'react'
import style from './Viewer.module.scss'
import 'github-markdown-css'
import classNames from 'classnames'

const markdown = require('markdown').markdown

export interface IRichTextViewerProps {
  value: string
}

const RichTextViewer = ({ value }: IRichTextViewerProps) => {
  return (
    <div className={classNames(style.Root, 'markdown-body')} dangerouslySetInnerHTML={{ __html: markdown.toHTML(value) }}></div>
  )
}

export default RichTextViewer
