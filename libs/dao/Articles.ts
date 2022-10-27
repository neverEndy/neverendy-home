import { promises as fs } from 'fs'
import { DAOBehavior } from './@types'

export type ArticleModel = {
  id: string
  content: string
}

class Articles implements DAOBehavior<ArticleModel>{
  async getAll () {
    const fileNames = await fs.readdir('public/blog/markdowns/', { withFileTypes: false })
    const result: ArticleModel[] = []
    for (const fileName of fileNames) {
      const article = await this.getById(fileName)
      result.push(article)
    }
    return result
  }

  async getById (id: string) {
    const buffer = await fs.readFile(`public/blog/markdowns/${id}.md`)
    return { id, content: await buffer.toString() } 
  }

  async create (model: ArticleModel) {
    await fs.writeFile(`public/blog/markdowns/${model.id}.md`, model.content)
  }

  async delete (id: string) {
    await fs.unlink(`public/blog/markdowns/${id}.md`)
  }

  async update (id: string, model: Omit<ArticleModel, 'id'>) {
    await fs.writeFile(`public/blog/markdowns/${id}.md`, model.content)
  }
}

export default new Articles()
