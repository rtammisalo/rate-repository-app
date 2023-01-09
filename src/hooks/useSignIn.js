import { AUTHENTICATE } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE, {
    fetchPolicy: 'network-only',
  })

  const signIn = async ({ username, password }) => {
    await mutate({ variables: { username, password } })
    return result
  }

  return [signIn, result]
}

export default useSignIn
