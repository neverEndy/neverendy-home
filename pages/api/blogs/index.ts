import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const fileNames = await fs.readdir('public/blog/markdowns/')
  res.status(200).json({
    length: fileNames.length,
    datas: fileNames
  })
}
