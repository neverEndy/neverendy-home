import type { NextApiRequest, NextApiResponse } from 'next'

export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void

export type MethodHandler = {
  get?: RequestHandler,
  post?: RequestHandler,
  delete?: RequestHandler,
  put?: RequestHandler
}

export const requestMethodHandler = (handler: MethodHandler) => {
  return (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
      case 'GET':
        if (handler.get) {
          handler.get(req, res)
          break
        }
      case 'POST':
        if (handler.post) {
          handler.post(req, res)
          break
        }
      case 'DELETE':
        if (handler.delete) {
          handler.delete(req, res)
          break
        }
      case 'PUT':
        if (handler.put) {
          handler.put(req, res)
          break
        }
      default:
        throw new Error('no handler found in MethodHandler')
    }
  }
}
