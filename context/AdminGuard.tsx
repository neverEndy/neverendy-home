import { useRouter } from 'next/router'
import React from 'react'
import { createContext } from 'react'

export type AdminGuardContextType = {
  allowEnter: boolean
}

export interface IAdminGuardProps {
  children: React.ReactNode
  acceptMode?: typeof process.env.NODE_ENV 
}

const AdminGuardContext = createContext({} as AdminGuardContextType)

const AdminGuard = ({
  children,
  acceptMode = 'development'
}: IAdminGuardProps) => {
  const router = useRouter()
  const pathname = router.pathname
  const protectPathRule = /^\/Admin.*$/
  const shouldProtectPath = protectPathRule.test(pathname)
  const allowEnter = process.env.NODE_ENV === acceptMode

  if (!allowEnter && shouldProtectPath) {
    return <div>Stop doing this, it won't work</div>
  }
  const value: AdminGuardContextType = {
    allowEnter
  }
  return (
    <AdminGuardContext.Provider value={value}>
      {children}
    </AdminGuardContext.Provider>
  )
}

export default AdminGuard
