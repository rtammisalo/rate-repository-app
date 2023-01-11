import { REVIEW_REPOSITORY } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

const useCreateReview = () => {
  const [mutate, result] = useMutation(REVIEW_REPOSITORY)

  const createReview = async (review) => {
    const response = await mutate({ variables: review })

    return response?.data.createReview.repositoryId
  }

  return [createReview, result]
}

export default useCreateReview
