import { Alert, FlatList, Linking, StyleSheet, View } from 'react-native'
import { format } from 'date-fns'
import theme from '../theme'
import Text, { Heading } from './Text'
import Button from './Button'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  ratingAndReviewContainer: {
    flexDirection: 'row',
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
    alignItems: 'stretch',
  },
  detailsText: {
    marginTop: 5,
  },
  headerContainer: {
    marginBottom: 10,
  },
  reviewActionsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    flexGrow: 1,
    marginRight: 15,
  },
  deleteButton: {
    flexGrow: 1,
    backgroundColor: theme.colors.textError,
  },
  reviewItemContainer: {
    backgroundColor: theme.colors.viewBackground,
    padding: 15,
    alignItems: 'stretch',
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

const ReviewItem = ({
  review,
  userReviews = false,
  handleDeleteReview = () => {},
}) => {
  // Single review item, displayed at the repository page under the details

  const onPressView = () => {
    Linking.openURL(review.repository.url)
  }

  const onPressDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            handleDeleteReview(review.id)
          },
        },
      ]
    )
  }

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.ratingAndReviewContainer}>
        <Rating rating={review.rating} />
        <ReviewDetails review={review} userReviews={userReviews} />
      </View>
      {userReviews && (
        <View style={styles.reviewActionsContainer}>
          <Button
            content="View repository"
            onPress={onPressView}
            style={styles.viewButton}
          />
          <Button
            content="Delete review"
            onPress={onPressDelete}
            style={styles.deleteButton}
          />
        </View>
      )}
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

const ReviewList = ({
  reviews,
  listHeader = () => <></>,
  onEndReached = () => {},
  userReviews = false,
  ...props
}) => {
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} userReviews={userReviews} {...props} />
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
