import { map } from 'lodash'
import React from 'react'
import { withSideBar } from '../../../containers/Admin/SideBar'
import Link from 'next/link'
import blogMap from '../../../public/blog/map.json'
import style from './index.module.scss'

const MyBlog = () => {
  return (
    <div className={style.Root}>
      <div className={style.Actions}>
        <Link href='/Admin/MyBlog/CreateOrEdit?type=create'>Create Article</Link>
      </div>
      <div className={style.List}>
        {
          map(blogMap, (post, index) => (
            <article className={style.Article} key={index}>
              <span className={style.ArticleActions}>
                <Link href={`/Admin/MyBlog/CreateOrEdit?type=edit&id=${post.id}`}>Edit</Link>
                <button>Delete</button>
                <p>{post.id}</p>
              </span>
              <p>{post.title}</p>
              <p>{post.subtitle}</p>
              <p>{post.author}</p>
            </article>
          ))
        }
      </div>
    </div>
  )
}

export default withSideBar(MyBlog)
