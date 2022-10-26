import React from 'react'
import useSWR from 'swr'

// @ts-ignore
const fetcher = (...args) => fetch(...args).then(res => res.json())

const useBlogCategories = () => {
  const { data, error } = useSWR<string[]>('/neverendy-home/api/blogs/categories', fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useBlogCategories
