import React from 'react'
import Head from 'next/head'

export interface ISEOHeadProps {
  title?: string
  keywords?: string
  description?: string
}

export const DEFAULT_SEO_HEAD = {
  Title: 'NeverMD',
  Keywords: '軟體,技術,心得',
  Description: '一個工程師的世外桃源，包含軟體、資訊技術、採坑紀錄、還有一些無意義的文章'
}

const SEOHead = ({
  title = DEFAULT_SEO_HEAD.Title,
  keywords = DEFAULT_SEO_HEAD.Keywords,
  description = DEFAULT_SEO_HEAD.Description
}: ISEOHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
    </Head>
  )
}

export default SEOHead
