import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import blogList from '../../../public/blog/posts.json'
import 'github-markdown-css'

const markdown = require('markdown').markdown

type IPost = typeof blogList[0]

const Post = ({
  id,
  title,
  subtitle,
  detail,
  author
}: IPost) => {
  return (
    
    <article className="markdown-body">
      <div>
        <h1>{title}</h1>
        <h5>{subtitle}</h5>
      </div>
      <section dangerouslySetInnerHTML={{ __html: detail }}></section>
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogList.map(blog => ({ params: { id: blog.id } })),
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  if (!id) {
    return {
      notFound: true
    }
  }
  const post = blogList.filter(blog => blog.id === id)
  const resp = await fs.readFile(path.resolve('./', `public/blog/markdowns/${id}.md`))
  // const resp = await fetch(`./blog/markdowns/${id}`)
  const respText = await resp.toString()
  
  return {
    props: {
      ...post,
      detail: markdown.toHTML(respText)
    },
  }
}

export default Post
