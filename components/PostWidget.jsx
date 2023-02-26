import { getRecentPosts, getSimilarPosts } from "@/services"
import { useEffect, useState } from "react"

const PostWidget = ({slug, categories}) => {

  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimilarPosts(slug, categories)
      .then(result => setRelatedPosts(prev => result))
    } else {
      getRecentPosts()
      .then(result => setRelatedPosts(prev => result))
    }
  }, [slug])

  return (
    <div>PostWidget</div>
  )
}

export default PostWidget