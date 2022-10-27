// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteBlog, getBlogById, updateBlog } from '../../../libs/controller/blogs'
import { requestMethodHandler } from '../../../libs/controller/utils'
import Blogs from '../../../libs/dao/Blogs'

export type APIGetBlogByIdResponse = Awaited<ReturnType<typeof Blogs['getById']>>

export default requestMethodHandler({
  async get (req, res) {
    const id = String(req.query.id)
    const blog = await getBlogById(String(id))
    res.json(blog)
  },
  async delete (req, res) {
    const id = String(req.query.id)
    const result = await deleteBlog(id)
    res.json(result)
  },
  async patch (req, res) {
    const id = String(req.query.id)
    const body = JSON.parse(req.body)
    const options = {
      title: body.title,
      subtitle: body.subtitle,
      author: body.author,
      tags: body.tags,
      content: body.content,
      category: body.category
    }
    const blog = await updateBlog(id, options)
    res.json(blog)
  }
})
