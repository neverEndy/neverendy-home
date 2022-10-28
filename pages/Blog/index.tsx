import React, { useMemo } from 'react'
import { GetStaticProps } from 'next'
import blogMap from '../../public/blog/map.json'
import style from './index.module.scss'
import BlogList from '../../containers/Blog/BlogList'
import { BlogModel } from '../../libs/dao/Blogs'
import BlogCategory from '../../containers/Blog/BlogCategory'

interface IBlog {
  blogDict: { [k: string]: BlogModel }
}

const Blog = ({ blogDict }: IBlog) => {
  const blogs = useMemo(() => Object.values(blogDict).map(blog => ({ ...blog, disabledActions: true })), [blogDict])
  const newestBlogs = blogs.sort((a, b) => a.editDate < b.editDate ? -1 : 1).slice(0, 10)

  return (
    <main className={style.Root}>
      <BlogCategory className={style.BlogCategory} blogs={blogs}/>
      <div className={style.MainView}>
        <h2 className={style.Title}>最近10篇文章</h2>
        <BlogList className={style.BlogList} values={newestBlogs}/>
      </div>
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { blogDict: blogMap },
  }
}

export default Blog
