import { FlatList, StyleSheet, View } from 'react-native'
import { format } from 'date-fns'
import theme from '../theme'
import Text, { Heading } from './Text'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    padding: 15,
    alignItems: 'stretch',
    flexDirection: 'row',
    backgroundColor: theme.colors.viewBackground,
  },
  ratingContainer: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
  },
  detailsText: {
    marginTop: 5,
  },
  headerContainer: {
    marginBottom: 10,
  },
})

const Rating = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Heading color="primary" fontWeight="bold">
        {rating}
      </Heading>
    </View>
  )
}

const ReviewDetails = ({ review, userReviews = false }) => {
  return (
    <View style={styles.detailsContainer}>
      <Heading fontWeight="bold">
        {userReviews ? review.repository.fullName : review.user.username}
      </Heading>
      <Text color="textSecondary">
        {format(new Date(review.createdAt), 'dd.MM.yyyy')}
      </Text>
      <Text style={styles.detailsText}>{review.text}</Text>
    </View>
  )
}

const ReviewItem = ({ review, userReviews = false }) => {
  // Single review item, displayed at the repository page under the details
  return (
    <View style={styles.reviewContainer}>
      <Rating rating={review.rating} />
      <ReviewDetails review={review} userReviews={userReviews} />
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const ReviewList = ({
  reviews,
  listHeader = () => <></>,
  onEndReached = () => {},
  userReviews = false,
}) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} userReviews={userReviews} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={listHeader}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  )
}

export default ReviewList
