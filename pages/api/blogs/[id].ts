// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createBlog, CreateBlogOption, deleteBlog } from '../../../libs/controller/blogs'
import { requestMethodHandler } from '../../../libs/controller/utils'

export default requestMethodHandler({
  async delete (req, res) {
    const id = String(req.query.id)
    const result = await deleteBlog(id)
    res.json(result)
  }
})
