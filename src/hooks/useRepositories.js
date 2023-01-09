import { GET_REPOSITORIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  })

  const repositories = data ? data.repositories : data

  return { repositories, error, loading }
}

export default useRepositories
