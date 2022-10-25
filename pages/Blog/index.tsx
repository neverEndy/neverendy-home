import React from 'react'
import { GetStaticProps } from 'next'
import blogMap from '../../public/blog/map.json'
import style from './index.module.scss'
import NavLink from '../../components/Button/NavLink'
import { map } from 'lodash'
import BlogList from '../../containers/Blog/BlogList'
import { BlogModel } from '../../libs/dao/Blogs'

interface IBlog {
  blogDict: { [k: string]: BlogModel }
}

const Blog = ({ blogDict }: IBlog) => {
  const blogs = Object.values(blogDict).map(blog => ({ ...blog, disabledActions: true }))
  return (
    <main className={style.Root}>
      <div className={style.ArticlaContainer}>
        <BlogList values={blogs}/>
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
