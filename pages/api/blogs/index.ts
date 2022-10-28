// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createBlog, CreateBlogOption } from '../../../libs/controller/blogs'
import { requestMethodHandler } from '../../../libs/controller/utils'

export default requestMethodHandler({
  async post (req, res) {
    const body = JSON.parse(req.body)
    const options: CreateBlogOption = {
      title: body.title,
      subtitle: body.subtitle,
      author: body.author,
      tags: body.tags,
      article: body.article,
      category: body.category
    }
    const newBlog = await createBlog(options)
    res.json(newBlog)
  }
})
