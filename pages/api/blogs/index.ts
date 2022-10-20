import type { NextApiRequest, NextApiResponse } from 'next'
import { requestMethodHandler } from '../../../libs/controller/utils'
import { getAllBlogs, createBlog } from '../../../libs/controller/blogs'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  requestMethodHandler(req, res)({
    get: getAllBlogs,
    post: createBlog
  })
}
