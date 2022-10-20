import type { NextApiRequest, NextApiResponse } from 'next'
import { getBlogById } from '../../../libs/controller/blogs'
import { requestMethodHandler } from '../../../libs/controller/utils'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  requestMethodHandler(req, res)({
    get: getBlogById
  })
}
