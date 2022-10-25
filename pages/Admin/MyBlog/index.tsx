import { map } from 'lodash'
import React, { useState } from 'react'
import { withSideBar } from '../../../containers/Admin/SideBar'
import Link from 'next/link'
import blogMap from '../../../public/blog/map.json'
import style from './index.module.scss'
import Button from '../../../components/Button'
import { BlogModel } from '../../../libs/dao/Blogs'

const MyBlog = () => {
  const [blogDict, setBlogDict] = useState<{ [k: string]: BlogModel }>({ ...blogMap })
  const handleDelete = async (id: string) => {
    const fetchOptions: RequestInit = {
      method: 'DELETE'
    }
    const resp = await fetch(`http://localhost:3000/neverendy-home/api/blogs/${id}`, fetchOptions)
    const newBlog = await resp.json()
    delete blogDict[id]
    setBlogDict({ ...blogDict })
    return newBlog
  }
  return (
    <div className={style.Root}>
      <div className={style.Actions}>
        <Link href='/Admin/MyBlog/CreateOrEdit?type=create'>
          <a><Button>Create Article</Button></a>
        </Link>
      </div>
      <div className={style.List}>
        {
          map(blogDict, (post, index) => (
            <article className={style.Article} key={index}>
              <div className={style.ArticleHeader}>
                <Link href={`/Blog/${post.id}`}><a className={style.HeaderTitle}>{post.title}</a></Link>
                <span className={style.HeaderActions}>
                  <Link href={`/Admin/MyBlog/CreateOrEdit?type=edit&id=${post.id}`}>
                    <a><Button>Edit</Button></a>
                  </Link>
                  <Button onClick={() => handleDelete(post.id)}>Delete</Button>
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
