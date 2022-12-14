import classNames from 'classnames'
import { map } from 'lodash'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import useBlogCategoryHierarchy, { BlogHierarchy, BLOG_HIERARCHY_KEY } from '../../../hooks/useBlogCategoryHierarchy'
import { BlogModel } from '../../../libs/dao/Blogs'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import FolderIcon from '@mui/icons-material/Folder'
import style from './index.module.scss'

export interface IBlogCategoryProps {
  blogs: BlogModel[]
  className?: string
}

export interface IHierarchyViewProps {
  hierarchy: BlogHierarchy
  rootTitle: string
  className?: string
  onClick?: () => void
}

const HierarchyView = ({
  hierarchy,
  rootTitle,
  className = '',
  onClick = () => null,
  ...rest
}: IHierarchyViewProps) => {
  const [open, setOpen] = useState(true)
  const isFolder = (key: string) => new RegExp(BLOG_HIERARCHY_KEY.Folder).test(key)
  const isBlog = (key: string) => new RegExp(BLOG_HIERARCHY_KEY.Blog).test(key)
  const renderChild = (key: string, value: BlogHierarchy | BlogModel ) => {
    if (isFolder(key)) {
      return (
        <HierarchyView key={key} 
          className={classNames({ [style.FolderClose]: !open })}
          rootTitle={key.replace(BLOG_HIERARCHY_KEY.Folder, '')}
          hierarchy={value as BlogHierarchy}/>
      )
    } else if (isBlog(key)) {
      return  (
        <Link key={key} href={`/Blog/${value.id}`}>
          <a><li key={key} className={style.Blog}>{(value as BlogModel).title}</li></a>
        </Link>
      )
    }
    return null
  }
  return (
    <ul {...rest} className={classNames(style.Folder, className)}>
      <li className={style.FolderItem} onClick={() => setOpen(!open)}>
        { open ? <KeyboardArrowDownIcon fontSize='small'/> : <KeyboardArrowRightIcon fontSize='small'/> }
        <FolderIcon className={style.FolderIcon} fontSize='small'/>
        {rootTitle}
      </li>
      <ul className={classNames(style.FolderContent, { [style.FolderClose]: !open })}>
        {
          map(hierarchy, (value, key) => (
            renderChild(key, value)
          ))
        }
      </ul>
    </ul>
  )
}

const BlogCategory = ({
  blogs,
  className = ''
}: IBlogCategoryProps) => {
  const { hierarchy } = useBlogCategoryHierarchy({ blogs })
  return (
    <div className={classNames(style.Root, className)}>
      <HierarchyView hierarchy={hierarchy} rootTitle='Category'/>
    </div>
  )
}

export default BlogCategory
