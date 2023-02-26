import {request, gql} from "graphql-request"
import * as dotenv from "dotenv"

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

export const getSimilarPosts = async () => {
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
            }
          }
        }
      }
    `
    const response = await request(graphqlAPI, query)
    
    return response.postsConnection.edges
}
