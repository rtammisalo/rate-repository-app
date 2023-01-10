import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORY = gql`
  ${REPOSITORY_DETAILS}
  query GetRepository($id: ID!) {
    repository(id: $id) {
      url
      ...RepositoryDetails
    }
  }
`
