import { FlatList, View, StyleSheet } from 'react-native'
import { RepositoryItemContainer } from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({ repositories, getOnPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItemContainer item={item} onPress={getOnPress(item)} />
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories } = useRepositories()

  const navigate = useNavigate()

  const getOnPress = (item) => {
    return () => {
      navigate(`/repository/${item.id}`)
    }
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      getOnPress={getOnPress}
    />
  )
}

export default RepositoryList
