import { map } from 'lodash'
import React from 'react'
import useBlogCategoryHierarchy, { BlogHierarchy, BLOG_HIERARCHY_KEY } from '../../../hooks/useBlogCategoryHierarchy'
import { BlogModel } from '../../../libs/dao/Blogs'
import style from './index.module.scss'

export interface IBlogCategoryProps {
  blogs: BlogModel[]
}

export interface IHierarchyViewProps {
  hierarchy: BlogHierarchy
}

const HierarchyView = ({
  hierarchy
}: IHierarchyViewProps) => {
  const isFolder = (key: string) => new RegExp(BLOG_HIERARCHY_KEY.Folder).test(key)
  const isBlog = (key: string) => new RegExp(BLOG_HIERARCHY_KEY.Blog).test(key)
  const renderChild = (key: string, value: BlogHierarchy | BlogModel ) => {
    if (isFolder(key)) {
      return (
        <ul key={key} className={style.Folder}>
          <li className={style.FolderItem}>{key.replace(BLOG_HIERARCHY_KEY.Folder, '')}</li>
          <ul className={style.Folder}><HierarchyView hierarchy={value as BlogHierarchy}/></ul>
        </ul>
      )
    } else if (isBlog(key)) {
      return  <li key={key}  className={style.Blog}>{key.replace(BLOG_HIERARCHY_KEY.Blog, '')}</li>
    }
    return null
  }
  return (
    <>
      {
        map(hierarchy, (value, key) => (
          renderChild(key, value)
        ))
      }
    </>
  )
}

const BlogCategory = ({
  blogs
}: IBlogCategoryProps) => {
  const { hierarchy } = useBlogCategoryHierarchy({ blogs })
  return (
    <div>
      <HierarchyView hierarchy={hierarchy}/>
    </div>
  )
}

export default BlogCategory
