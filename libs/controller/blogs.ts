import { RequestHandler } from "./utils"
import { promises as fs } from 'fs'
import { uuid } from "../utils"
import Blogs, { BlogModel } from "../dao/Blogs"
import { ArticleModel } from "../dao/Articles"

export const getAllBlogs: RequestHandler = async (req, res) => {
  const blogs = await Blogs.getAll()
  res.status(200).json(blogs)
}

export const getBlogById: RequestHandler = async (req, res) => {
  const id = String(req.query.id)
  const blog = await Blogs.getById(id)
  res.status(200).json(blog)
}

export const createBlog: RequestHandler = async (req, res) => {
  const reqestBlog = {
    title: req.body.title,
    subtitle: req.body.subtitle || null,
    author: req.body.author || null,
    tags: req.body.tags || [],
    content: req.body.content
  }
  if (!(reqestBlog.title || reqestBlog.content)) {
    res.status(400).json({ msg: 'title is required' })
  }
  const id = uuid()
  const newBlog: BlogModel = {
    id,
    title: reqestBlog.title,
    subtitle: reqestBlog.subtitle,
    author: reqestBlog.author,
    tags: reqestBlog.tags,
    createdDate: Date.now(),
    editDate: Date.now(),
  }
  const newArticle: ArticleModel = {
    id,
    content: reqestBlog.content
  }
  Blogs.create(newBlog, newArticle)
  res.status(200).json(newBlog)
}
