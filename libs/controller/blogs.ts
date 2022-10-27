import { uuid } from "../utils"
import Blogs, { BlogModel } from "../dao/Blogs"
import Articles, { ArticleModel } from "../dao/Articles"

export const getAllBlogs = async () => {
  const blogs = await Blogs.getAll()
  return blogs
}

export const getBlogById = async (id: string) => {
  const blog = await Blogs.getById(id)
  return blog
}

export const getCategories = async () => {
  const blogs = await getAllBlogs()
  return Array.from(new Set(blogs.map(blog => blog.category)))
}

export type CreateBlogOption = Omit<BlogModel, 'id' | 'createdDate' | 'editDate'> & Omit<ArticleModel, 'id'>

export const createBlog = async (obj: CreateBlogOption) => {
  const id = uuid()
  const newBlog: BlogModel = {
    id,
    title: obj.title,
    subtitle: obj.subtitle,
    author: obj.author,
    tags: obj.tags,
    category: obj.category,
    createdDate: Date.now(),
    editDate: Date.now(),
  }
  const newArticle: ArticleModel = {
    id,
    content: obj.content
  }
  Blogs.create(newBlog, newArticle)
  return newBlog
}

export const deleteBlog = async (id: string) => {
  await Blogs.delete(id)
  await Articles.delete(id)
  return { id }
}

export const updateBlog = async (id: string, obj: CreateBlogOption) => {
  const newBlog = {
    title: obj.title,
    subtitle: obj.subtitle,
    author: obj.author,
    tags: obj.tags,
    category: obj.category,
    editDate: Date.now(),
  }
  const newArticle = {
    content: obj.content
  }
  const blog = await Blogs.update(id, newBlog, newArticle)
  return blog
}
