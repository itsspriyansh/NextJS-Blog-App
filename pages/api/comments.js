import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default comments = async (req, res) => {
  const graphQlClient = new GraphQLClient(graphqlAPI, {
    headers : {
      authorization : `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql `
    mutation CreateComment($name : String!, $email : String!, $comment : String!, $slug : String!) {
      createComment (data : {name : $name, email : $email, comment : $comment, post : {connect : {slug : $slug}}}) { id }
    }
  `

  const result = await graphQlClient.request(query, req.body)
  return res.status(200).send(result)
}