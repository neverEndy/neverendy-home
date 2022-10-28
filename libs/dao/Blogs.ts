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
  category: string
  description?: string
  article: ArticleModel
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
    const blog = blogMap[id]
    return blog
  }

  async create (model: BlogModel) {
    const article = model.article
    const blogMap = await this.getMap()
    const text = JSON.stringify({ ...blogMap, [model.id]: model })
    await fs.writeFile(`public/blog/map.json`, text)
    await Articles.create(article)
  }

  async delete (id: string) {
    const map = await this.getMap()
    delete map[id]
    await fs.writeFile(`public/blog/map.json`, JSON.stringify(map))
    await Articles.delete(id)
  }
  async update (id: string, model: Partial<Omit<BlogModel, 'id'>>) {
    const oldBlog = await this.getById(id)
    const article = oldBlog.article
    const oldBlogMap = await this.getMap()
    const newBlog = { ...oldBlog, ...model }
    const text = JSON.stringify({ ...oldBlogMap, [id]: newBlog })
    await fs.writeFile(`public/blog/map.json`, text)
    article && await Articles.update(id, article)
    const newArticle = await Articles.getById(id)
    return {
      ...newBlog,
      article: newArticle
    }
  }
}

export default new Blogs()
