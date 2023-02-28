import { getRecentPosts, getSimilarPosts } from "@/services"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"

const PostWidget = ({slug, categories}) => {

  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    (async () => {
      if (slug) {
        const result = await getSimilarPosts(slug, categories)
        setRelatedPosts(prev => result)
      } else {
        const result = await getRecentPosts()
        setRelatedPosts(prev => result)
      }
    })()
  }, [slug])


  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {
        relatedPosts.map(post => (
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                alt={post.title}
                src={post.featuredImage.url}
                className="h-full w-full object-cover"
              />
              </div>
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title}>
                <p className="hover-underline-animation">
                    {post.title}
                </p>
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PostWidget