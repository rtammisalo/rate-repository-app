import { FlatList, StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import Text, { Heading } from './Text'
import theme from '../theme'
import { format } from 'date-fns'

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

const ItemSeparator = () => <View style={styles.separator} />

const Rating = ({ rating }) => {
  return (
    <View style={styles.ratingContainer}>
      <Heading color="primary" fontWeight="bold">
        {rating}
      </Heading>
    </View>
  )
}

const ReviewDetails = ({ review }) => {
  return (
    <View style={styles.detailsContainer}>
      <Heading fontWeight="bold">{review.user.username}</Heading>
      <Text color="textSecondary">
        {format(new Date(review.createdAt), 'dd.MM.yyyy')}
      </Text>
      <Text style={styles.detailsText}>{review.text}</Text>
    </View>
  )
}

const ReviewItem = ({ review }) => {
  // Single review item, displayed at the repository page under the details
  return (
    <View style={styles.reviewContainer}>
      <Rating rating={review.rating} />
      <ReviewDetails review={review} />
    </View>
  )
}

const Repository = () => {
  const { id } = useParams()
  const { repository, loading } = useRepository(id)

  if (loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    )
  }

  if (!repository) {
    return (
      <View>
        <Text>Missing repository data</Text>
      </View>
    )
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node)

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem
          style={styles.headerContainer}
          item={repository}
          showLink
        />
      )}
      // ...
    />
  )
}

export default Repository
