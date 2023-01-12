import { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { RepositoryItemContainer } from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { useNavigate } from 'react-router-native'
import RepositoryListHeader from './RepositoryListHeader'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  getOnPress,
  getHeader,
}) => {
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
      ListHeaderComponent={getHeader}
    />
  )
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(() => 'latest')
  const { repositories } = useRepositories(selectedOrder)
  const navigate = useNavigate()

  const getOnPress = (item) => {
    return () => {
      navigate(`/repository/${item.id}`)
    }
  }

  const getRepositoryListHeader = () => {
    return <RepositoryListHeader {...{ selectedOrder, setSelectedOrder }} />
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      getOnPress={getOnPress}
      getHeader={getRepositoryListHeader}
    />
  )
}

export default RepositoryList
