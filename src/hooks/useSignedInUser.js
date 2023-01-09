import { GET_USER } from '../graphql/queries'
import { useQuery } from '@apollo/client'

const useSignedInUser = () => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    // Other options
  })

  const currentUser = data?.me?.username

  return { currentUser, error, loading }
}

export default useSignedInUser
