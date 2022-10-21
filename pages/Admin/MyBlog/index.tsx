import { map } from 'lodash'
import React from 'react'
import { withSideBar } from '../../../containers/Admin/SideBar'
import Link from 'next/link'
import blogMap from '../../../public/blog/map.json'
import style from './index.module.scss'
import Button from '../../../components/Button'

const MyBlog = () => {
  return (
    <div className={style.Root}>
      <div className={style.Actions}>
        <Link href='/Admin/MyBlog/CreateOrEdit?type=create'>
          <a><Button>Create Article</Button></a>
        </Link>
      </div>
      <div className={style.List}>
        {
          map(blogMap, (post, index) => (
            <article className={style.Article} key={index}>
              <div className={style.ArticleHeader}>
                <Link href={`/Blog/${post.id}`}><a className={style.HeaderTitle}>{post.title}</a></Link>
                <span className={style.HeaderActions}>
                  <Link href={`/Admin/MyBlog/CreateOrEdit?type=edit&id=${post.id}`}>
                    <a><Button>Edit</Button></a>
                  </Link>
                  <Button>Delete</Button>
                </span>
              </div>
              <div className={style.ArticleInfo}>
                <p>{Array.from(post.id).slice(0, 8).join('')}...</p>
                <p>{post.subtitle}</p>
                <p>{post.author}</p>
              </div>
            </article>
          ))
        }
      </div>
    </div>
  )
}

export default withSideBar(MyBlog)
