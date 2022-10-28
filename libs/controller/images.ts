import { uuid } from "../utils"
import Images from "../dao/Images"

export const getImageById = async (id: string) => {
  return await Images.getById(id)
}

export type CreateImageOptions = { base64: string }

export const createImage = async (options: CreateImageOptions) => {
  const id = uuid()
  const {
    base64
  } = options
  const fileName = `${id}.png`
  await Images.create({
      id,
      fileName,
    },
    base64
  )
  return fileName
}

export const deleteImage = async (id: string) => {
  await Images.delete(id)
  return id
}
