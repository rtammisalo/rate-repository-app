import { gql } from '@apollo/client'
import {
  REPOSITORY_DETAILS,
  PAGE_INFO_DETAILS,
  REVIEW_DETAILS,
} from './fragments'

export const GET_REPOSITORIES = gql`
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO_DETAILS}
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
  ) {
    repositories(
      first: 8
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        ...PageInfoDetails
      }
    }
  }
`

export const GET_USER = gql`
  ${PAGE_INFO_DETAILS}
  ${REVIEW_DETAILS}
  query GetUser($after: String, $includeReviews: Boolean = false) {
    me {
      id
      username
      reviews(first: 10, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
            repository {
              fullName
              url
            }
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO_DETAILS}
  query GetRepository($id: ID!, $after: String) {
    repository(id: $id) {
      url
      ...RepositoryDetails
      reviews(first: 8, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
`
