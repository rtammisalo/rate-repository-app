import { StyleSheet, View } from 'react-native'
import { useParams } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import Text from './Text'
import ReviewList from './ReviewList'

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 10,
  },
})

const Repository = () => {
  const { id } = useParams()
  const { repository, loading, fetchMore } = useRepository(id)

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

  const onEndReached = () => {
    fetchMore()
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node)

  return (
    <ReviewList
      {...{
        reviews,
        onEndReached,
        listHeader: () => (
          <RepositoryItem
            style={styles.headerContainer}
            item={repository}
            showLink
          />
        ),
      }}
    />
  )
}

export default Repository
