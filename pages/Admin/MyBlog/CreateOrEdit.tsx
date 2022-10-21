import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useBlogById from '../../../hooks/api/useBlogById'
import BlogCreator from '../../../containers/Admin/Blog/BlogCreator'
import BlogEditor from '../../../containers/Admin/Blog/BlogEditor'

const CreateOrEdit = () => {
  const router = useRouter()
  const { type, id } = router.query
  const isAllowCreate = type === 'create'
  const isAllowEdit = type === 'edit' && typeof id === 'string'
  const { data: blog } = useBlogById({ id: isAllowEdit ? String(id) : undefined })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isAllowCreate) {
      setLoading(false)
    } else if (isAllowEdit && !!blog) {
      setLoading(false)
    }
  }, [type, id, blog])

  if (loading) {
    return <span>loading...</span>
  }
  return (
    <main>
      { isAllowCreate && <BlogCreator /> }
      { isAllowEdit &&<BlogEditor /> }
    </main>
  )
}

export default CreateOrEdit
