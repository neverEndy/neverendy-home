import React, { useMemo } from 'react'
import { GetStaticProps } from 'next'
import blogMap from '../../public/blog/map.json'
import style from './index.module.scss'
import BlogList from '../../containers/Blog/BlogList'
import { BlogModel } from '../../libs/dao/Blogs'
import useBlogCategories from '../../hooks/api/useBlogCategories'
import useBlogCategoryHierarchy from '../../hooks/useBlogCategoryHierarchy'
import BlogCategory from '../../containers/Blog/BlogCategory'

interface IBlog {
  blogDict: { [k: string]: BlogModel }
}

const Blog = ({ blogDict }: IBlog) => {
  // const { data } = useBlogCategories()
  const blogs = useMemo(() => Object.values(blogDict).map(blog => ({ ...blog, disabledActions: true })), [blogDict])
  const hierarchy = useBlogCategoryHierarchy({ blogs })
  // const blogs = Object.values(blogDict).map(blog => ({ ...blog, disabledActions: true }))


  console.log(hierarchy)
  return (
    <main className={style.Root}>
      <div className={style.ArticlaContainer}>
        <BlogCategory blogs={blogs}/>
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
