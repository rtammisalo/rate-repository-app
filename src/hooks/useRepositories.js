import { GET_REPOSITORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepositories = (searchKeyword, sortOrder) => {
  const variables = { searchKeyword }

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

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  const repositories = data ? data.repositories : data

  return { repositories, fetchMore: handleFetchMore, error, loading }
}

export default useRepositories
