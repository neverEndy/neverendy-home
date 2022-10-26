// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCategories } from '../../../libs/controller/blogs'
import { requestMethodHandler } from '../../../libs/controller/utils'

export default requestMethodHandler({
  async get (req, res) {
    const categories = await getCategories()
    res.json(categories)
  }
})
