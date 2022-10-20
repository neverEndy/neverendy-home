import { RequestHandler } from "./utils"
import { promises as fs } from 'fs'
import { uuid } from "../utils"

export const getAllBlogs: RequestHandler = async (req, res) => {
  const fileNames = await fs.readdir('public/blog/markdowns/')
  res.status(200).json({
    length: fileNames.length,
    datas: fileNames
  })
}

export const getBlogById: RequestHandler = async (req, res) => {
  const id = String(req.query.id)
  const mapbuffer = await fs.readFile('public/blog/map.json')
  const blogMap = JSON.parse(mapbuffer.toString())
  const buffer = await fs.readFile(`public/blog/markdowns/${id}.md`)
  res.status(200).json({
    ...blogMap[id],
    content: await buffer.toString()
  })
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
  const buffer = await fs.readFile('public/blog/map.json')
  const blogMap = JSON.parse(buffer.toString())
  const id = uuid()
  const newBlog = {
    id,
    title: reqestBlog.title,
    subtitle: reqestBlog.subtitle,
    author: reqestBlog.author,
    tags: reqestBlog.tags,
    createdDate: Date.now(),
    editDate: Date.now(),
  }
  await fs.writeFile(`public/blog/map.json`, JSON.stringify({ ...blogMap, [id]: newBlog }))
  await fs.writeFile(`public/blog/markdowns/${id}.md`, reqestBlog.content)
  res.status(200).json(newBlog)
}
