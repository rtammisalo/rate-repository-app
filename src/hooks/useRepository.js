import { GET_REPOSITORY } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  })

  const repository = data?.repository

  return { repository, error, loading }
}

export default useRepository
