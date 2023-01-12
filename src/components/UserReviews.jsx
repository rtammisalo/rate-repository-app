import { View } from 'react-native'
import useSignedInUser from '../hooks/useSignedInUser'
import ReviewList from './ReviewList'
import Text from './Text'
import useDeleteReview from '../hooks/useDeleteReview'

const UserReviews = () => {
  const { reviewEdges, fetchMore, refetch } = useSignedInUser({
    includeReviews: true,
  })
  const [deleteReview] = useDeleteReview()

  if (!reviewEdges) {
    return (
      <View>
        <Text>No reviews found</Text>
      </View>
    )
  }

  const onEndReached = () => {
    fetchMore()
  }

  const handleDeleteReview = (id) => {
    try {
      deleteReview(id)
      refetch()
    } catch (e) {
      console.log(e)
    }
  }

  const reviews = reviewEdges.map((edge) => edge.node)

  return (
    <ReviewList
      {...{
        reviews,
        onEndReached,
        handleDeleteReview,
      }}
      userReviews
    />
  )
}

export default UserReviews
