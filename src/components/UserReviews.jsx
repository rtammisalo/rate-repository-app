import { View } from 'react-native'
import useSignedInUser from '../hooks/useSignedInUser'
import ReviewList from './ReviewList'
import Text from './Text'

const UserReviews = () => {
  const { reviewEdges, fetchMore } = useSignedInUser({
    includeReviews: true,
  })

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

  const reviews = reviewEdges.map((edge) => edge.node)

  return (
    <ReviewList
      {...{
        reviews,
        onEndReached,
      }}
      userReviews
    />
  )
}

export default UserReviews
