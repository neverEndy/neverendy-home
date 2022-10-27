
export interface DAOBehavior<M extends {}> {
  getAll: () => any
  getById: (id: string) => any
  create: (model: M, additional?: any) => any
  delete: (id: string) => any
  update: (id: string, model: M, additional?: any) => any
}
