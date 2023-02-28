import {request, gql} from "graphql-request"

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getRecentPosts = async () => {
  const query = gql `
    query GetPostDetails() {
      posts (
        orderBy : createdAt_ASC
        last : 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const response = await request(graphqlAPI, query)
  return response.posts
}

export const getSimilarPosts = async (slug, categories) => {
  const query = gql `
    query GetPostDetails ($slug : String!, $categories : [String!]) {
      posts (
        where : { slug_not : $slug, AND : {categories_some : {slug_in : $categories}}}
        last : 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const response = await request(graphqlAPI, query, {slug, categories})
  return response.posts
}

export const getCategories = async () => {
  const query = gql `
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `
  const response = await request(graphqlAPI, query)
  return response.categories
}

export const getPostDetails = async (slug) => {
  const query = gql `
    query GetPostDetails ($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `
  const response = await request(graphqlAPI, query, {slug})
  return response.post
}

export const getPosts = async () => {
    const query = gql `
    query Assets {
        assets {
          createdAt
          id
          publishedAt
          fileName
          url
          updatedAt
        }
        postsConnection {
          edges {
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
              excerpt
            }
          }
        }
      }
    `
    const response = await request(graphqlAPI, query)
    return response.postsConnection.edges
}

export const submitComment = async (obj) => {
  const result = await fetch (`${process.env.APP_BASE_URL}/api/comments`, {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(obj),
  })

  return result.json()
}
