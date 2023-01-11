import { CREATE_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER)

  const signUp = async (userdata) => {
    const response = await mutate({ variables: userdata })

    return response?.data.createUser.username
  }

  return [signUp, result]
}

export default useSignUp
