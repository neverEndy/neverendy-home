import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id
  switch (req.method) {
    case 'GET':
      const buffer = await fs.readFile(`public/blog/markdowns/${id}.md`)
      res.status(200).json({
        content: await buffer.toString()
      })
      break
    case 'POST':
      
      break
  }
}
