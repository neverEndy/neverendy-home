import { promises as fs } from 'fs'
import { DAOBehavior } from './@types'

export type ImageModel = {
  id: string
  fileName: string
}

class Images implements DAOBehavior<ImageModel> {
  private async getMap () {
    const buffer = await fs.readFile('public/blog/imagesMap.json')
    console.log(222, buffer.toString())
    const result = JSON.parse(buffer.toString() || '{}') as { [k: string]: ImageModel }
    return result
  }

  async getAll () {
    const map = await this.getMap()
    return Object.values(map)
  }

  async getById (id: string) {
    const map = await this.getMap()
    const blog = map[id]
    return blog
  }

  async create (model: ImageModel, base64: string) {
    const map = await this.getMap()
    const text = JSON.stringify({ ...map, [model.id]: model })
    const buffer = Buffer.from(base64.replace(/^data:image\/png;base64,/, ""), 'base64')
    await fs.writeFile(`public/blog/imagesMap.json`, text)
    await fs.writeFile(`public/blog/images/${model.fileName}`, buffer)
  }

  async delete (id: string) {
    const map = await this.getMap()
    const target = map[id]
    delete map[id]
    await fs.writeFile(`public/blog/imagesMap.json`, JSON.stringify(map))
    await fs.unlink(`public/blog/images/${target.fileName}`)
  }
  async update () {}
}

export default new Images()
