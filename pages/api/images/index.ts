// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createImage, CreateImageOptions } from '../../../libs/controller/images'
import { requestMethodHandler } from '../../../libs/controller/utils'

export default requestMethodHandler({
  async post (req, res) {
    const body = JSON.parse(req.body)
    const options: CreateImageOptions = {
      base64: body.base64
    }
    const fileName = await createImage(options)
    res.json({ fileName })
  }
})
