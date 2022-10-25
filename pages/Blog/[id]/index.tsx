import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import blogMap from '../../../public/blog/map.json'
import 'github-markdown-css'
import { map } from 'lodash'
import { getBlogById } from '../../../libs/controller/blogs'

const markdown = require('markdown').markdown

type IPost = typeof blogMap['blg-title1'] & {
  content: string
}

const Post = ({
  id,
  title,
  subtitle,
  content,
  author
}: IPost) => {
  return (
    <main>
      <article className="markdown-body">
        <div>
          <h1>{title}</h1>
          <h5>{subtitle}</h5>
        </div>
        <section dangerouslySetInnerHTML={{ __html: content }}></section>
      </article>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: map(blogMap, blog => ({ params: { id: blog.id } })),
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
  const respJson = await getBlogById(String(id))
  
  return {
    props: {
      ...respJson,
      content: markdown.toHTML(respJson.article.content)

    }
  }
}

export default Post
