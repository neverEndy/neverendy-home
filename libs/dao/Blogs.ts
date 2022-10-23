import { promises as fs } from 'fs'
import { DAOBehavior } from './@types'
import Articles, { ArticleModel } from './Articles'

export type BlogModel = {
  id: string
  title: string
  subtitle: string
  author: string
  tags: string
  createdDate: number
  editDate: number
}

class Blogs implements DAOBehavior<BlogModel> {
  private async getMap () {
    const buffer = await fs.readFile('public/blog/map.json')
    const result = JSON.parse(buffer.toString()) as { [k: string]: BlogModel }
    return result
  }

  async getAll () {
    const map = await this.getMap()
    return Object.values(map)
  }

  async getById (id: string) {
    const blogMap = await this.getMap()
    const blog = {
      ...blogMap[id],
      article: await Articles.getById(id)
    }
    return blog
  }

  async create (model: BlogModel, article: ArticleModel) {
    const buffer = await fs.readFile('public/blog/map.json')
    const blogMap = JSON.parse(buffer.toString())
    await fs.writeFile(`public/blog/map.json`, JSON.stringify({ ...blogMap, [model.id]: model }))
    Articles.create(article)
  }

  async delete () {}
  async update () {}
}

export default new Blogs()
