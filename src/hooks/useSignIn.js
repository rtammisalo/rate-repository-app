import { AUTHENTICATE } from '../graphql/mutations'
import { useMutation, useApolloClient } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(AUTHENTICATE, {
    fetchPolicy: 'no-cache',
  })

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } })

    if (response.data) {
      authStorage.setAccessToken(response.data.authenticate.accessToken)
      // Clear cache and re-execute all active queries
      apolloClient.resetStore()
    }

    return response
  }

  return [signIn, result]
}

export default useSignIn
