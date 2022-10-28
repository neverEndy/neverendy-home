import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import blogMap from '../../../public/blog/map.json'
import 'github-markdown-css'
import { map } from 'lodash'
import { getBlogById } from '../../../libs/controller/blogs'
import { BlogModel } from '../../../libs/dao/Blogs'
import { ArticleModel } from '../../../libs/dao/Articles'
import SEOHead, { DEFAULT_SEO_HEAD } from '../../../layout/Head'

const markdown = require('markdown').markdown

type IPost = BlogModel & ArticleModel

const Post = ({
  title,
  content,
  tags,
  description
}: IPost) => {
  return (
    <main>
      <SEOHead 
        title={`${DEFAULT_SEO_HEAD.Title}-${title}`}
        keywords={`${tags},${DEFAULT_SEO_HEAD.Keywords}`}
        description={description || DEFAULT_SEO_HEAD.Description}/>
      <article className="markdown-body">
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
