import { useEffect, useState } from "react"
import { BlogModel } from "../libs/dao/Blogs"

export type UseBlogCategoryHierarchyOptions = {
  blogs?: BlogModel[]
}

export type BlogHierarchy = { [k: string]: BlogHierarchy | BlogModel }

export const BLOG_HIERARCHY_KEY = {
  Folder: '#folder#',
  Blog: '#blog#'
}

const buildHierarchy = (blogs: BlogModel[]) => {
  const output = {}
  let current: any

  for (const blog of blogs) {
    const path = blog.category
    current = output
    const folders = path ? path.split('/') : []
    for (let i = 0; i < folders.length; i++) {
      const isFinalFolder = i >= folders.length - 1
      const segment = folders[i]
      if (segment !== '') {
        const segmentKey = `${BLOG_HIERARCHY_KEY.Folder}${segment}`
        if (!(segmentKey in current)) {
          current[segmentKey] = {}
        }
        current = current[segmentKey]
        if (isFinalFolder) {
          current[`${BLOG_HIERARCHY_KEY.Blog}${blog.id}`] = blog
        }
      }
    }
  }
  return output as BlogHierarchy
}

const useBlogCategoryHierarchy = ({ blogs }: UseBlogCategoryHierarchyOptions) => {
  const [hierarchy, setHierarchy] = useState<BlogHierarchy>({})

  useEffect(() => {
    if (!blogs) return
    const hierarchy = buildHierarchy(blogs)
    setHierarchy(hierarchy)
  }, [blogs])
  return {
    hierarchy
  }
}

export default useBlogCategoryHierarchy
