import { useApolloClient } from '@apollo/client'
import useAuthStorage from './useAuthStorage'

const useSignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signOut = () => {
    console.log('Signing out user')

    authStorage.removeAccessToken()
    // Clear cache and re-execute all active queries
    apolloClient.resetStore()
  }

  return signOut
}

export default useSignOut
