import { map } from 'lodash'
import React, { useState } from 'react'
import { withSideBar } from '../../../containers/Admin/SideBar'
import Link from 'next/link'
import blogMap from '../../../public/blog/map.json'
import style from './index.module.scss'
import Button from '../../../components/Button'
import { BlogModel } from '../../../libs/dao/Blogs'
import BlogList from '../../../containers/Blog/BlogList'
import BlogCategory from '../../../containers/Blog/BlogCategory'

const MyBlog = () => {
  const [blogDict, setBlogDict] = useState<{ [k: string]: BlogModel }>({ ...blogMap })
  const blogs = Object.values(blogDict)
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
      <BlogCategory blogs={blogs}/>
      <div className={style.MainView}>
        <div className={style.Actions}>
        <Link href='/Admin/MyBlog/CreateOrEdit?type=create'>
          <a><Button>Create Article</Button></a>
        </Link>
      </div>
        <BlogList className={style.BlogList} values={blogs} onDelete={id => handleDelete(id)}/>
      </div>
    </div>
  )
}

export default withSideBar(MyBlog)
