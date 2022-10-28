import React from 'react'
import style from './Editor.module.scss'
import 'github-markdown-css'
import RichTextViewer from './Viewer'

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result as string)
  reader.onerror = error => reject(error)
})

const getBase64ImgSize = (base64: string) => new Promise<{ width: number, height: number }>((resolve, reject) => {
  const img = new Image();
  img.src = base64
  img.onload = () => {
    resolve({ width: img.width, height: img.height })
  }
})

const resizeBase64Img = (base64: string, width: number, height: number) => {
  const img = new Image()
  img.src = base64
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('ctx not found')
  canvas.width = width
  canvas.height = height
  return new Promise<string>((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL())
    }
  })
}


export interface IRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  onUploadImage: (base64: string) => Promise<string>
}

const RichTextEditor = ({
  value,
  onChange,
  onUploadImage
}: IRichTextEditorProps) => {

  const handlePasteImage = async (file: File, cursorPosition: number) => {
    if (!file) return
    
    const b64 = await toBase64(file)
    const { width, height } = await getBase64ImgSize(b64)
    const originalRatio = height / width
    const maxWidth = 900
    const maxHeight = maxWidth * originalRatio

    const base64 = width > maxWidth ? await resizeBase64Img(b64, maxWidth, maxHeight) : b64
    const fileName = await onUploadImage(base64)

    const textBefore = value.slice(0, cursorPosition)
    const textAfter = value.slice(cursorPosition, value.length)
    const finalText = textBefore + `![image](/neverendy-home/blog/images/${fileName})` + textAfter
    onChange(finalText)
  }
  return (
    <div className={style.Root}>
      <div  className={style.Toolbar}></div>
      <textarea
        className={style.MarkdownInput}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onPaste={e => handlePasteImage(e.clipboardData.files[0], (e.target as any).selectionStart)}
        onDrop={e => handlePasteImage(e.dataTransfer.files[0], (e.target as any).selectionStart)}/>
      <RichTextViewer value={value}/>
    </div>
  )
}

export default RichTextEditor
