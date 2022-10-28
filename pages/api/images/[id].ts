// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getImageById } from '../../../libs/controller/images'
import { requestMethodHandler } from '../../../libs/controller/utils'
import Images from '../../../libs/dao/Images'

export type APIGetImageByIdResponse = Awaited<ReturnType<typeof Images['getById']>>

export default requestMethodHandler({
  async get (req, res) {
    const id = String(req.query.id)
    const image = await getImageById(id)
    res.json(image)
  },
})
