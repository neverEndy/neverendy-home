import React from 'react'
import { GetStaticProps } from 'next'
import blogList from '../../public/blog/posts.json'
import style from './index.module.scss'
import NavLink from '../../components/Button/NavLink'

interface IBlog {
  posts: typeof blogList
}

const Blog = ({ posts }: IBlog) => {
  return (
    <div className={style.Root}>
      <div className={style.ArticlaContainer}>
        {
          posts.map((post, index) => (
            <article className={style.Artical} key={index}>
              <NavLink href={`/Blog/${post.id}`}>
                <span>
                  <h3>{post.title}</h3>
                  <p>{post.subtitle}</p>
                </span>
              </NavLink>
              <p>{post.author}</p>
            </article>
          ))
        }
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { posts: blogList },
  }
}

export default Blog
