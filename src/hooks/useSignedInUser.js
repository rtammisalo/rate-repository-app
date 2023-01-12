import { GET_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useSignedInUser = (variables = {}) => {
  const { data, error, loading, fetchMore } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  const currentUser = data?.me?.username
  const reviewEdges = data?.me?.reviews?.edges

  return {
    currentUser,
    reviewEdges,
    error,
    loading,
    fetchMore: handleFetchMore,
  }
}

export default useSignedInUser
