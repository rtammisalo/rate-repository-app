import { GET_REPOSITORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepositories = (sortOrder) => {
  const variables = {}

  switch (sortOrder) {
    case 'ascRating':
      variables.orderBy = 'RATING_AVERAGE'
      variables.orderDirection = 'ASC'
      break
    case 'descRating':
      variables.orderBy = 'RATING_AVERAGE'
      variables.orderDirection = 'DESC'
      break
    default:
      // Also 'latest'
      variables.orderBy = 'CREATED_AT'
      variables.orderDirection = 'DESC'
      break
  }

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  })

  const repositories = data ? data.repositories : data

  return { repositories, error, loading }
}

export default useRepositories
