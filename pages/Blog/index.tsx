import React from 'react'
import { GetStaticProps } from 'next'
import blogMap from '../../public/blog/map.json'
import style from './index.module.scss'
import NavLink from '../../components/Button/NavLink'
import { map } from 'lodash'

interface IBlog {
  posts: typeof blogMap
}

const Blog = ({ posts }: IBlog) => {
  return (
    <main className={style.Root}>
      <div className={style.ArticlaContainer}>
        {
          map(blogMap, (post, index) => (
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
    </main>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: { posts: blogMap },
  }
}

export default Blog
