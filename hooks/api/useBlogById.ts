import useSWR from 'swr'
import { APIGetBlogByIdResponse } from '../../pages/api/blogs/[id]'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

export type UseBlogByIdParam = {
  id?: string
}

const useBlogById = ({ id }: UseBlogByIdParam) => {
  const { data, error } = useSWR<APIGetBlogByIdResponse>(id ? `/neverendy-home/api/blogs/${id}` : null, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useBlogById
