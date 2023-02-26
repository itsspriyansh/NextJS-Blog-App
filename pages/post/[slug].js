import React from 'react'
import { PostDetails, PostWidget, Author, CommentsForm, Categories, Comments } from '@/components'
import { getPostDetails, getPosts } from '@/services'

const PostDetail = ({ data }) => {

  return (
    <>
    <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
            <PostDetails post={data} />
            <Author author={data.author} />
            <CommentsForm slug={data.slug} />
            <Comments slug={data.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
            <PostWidget slug={data.slug} categories={data.categories.map((category) => category.slug)} />
            <Categories />
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  const data = await getPostDetails(params.slug)
  return ({
    props : { data }
  })
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  return ({
    paths : posts.map(({node : {slug}}) => ({params : { slug }})),
    fallback : false
  })
}

export default PostDetail