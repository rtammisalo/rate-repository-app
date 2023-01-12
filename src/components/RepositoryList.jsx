import React, { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'
import { RepositoryItemContainer } from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import RepositoryListHeader from './RepositoryListHeader'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
  renderHead = () => {
    const props = this.props

    return <RepositoryListHeader {...props} />
  }

  render() {
    const repositories = this.props.repositories
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : []
    const getOnPress = this.props.getOnPress

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <RepositoryItemContainer item={item} onPress={getOnPress(item)} />
        )}
        ListHeaderComponent={this.renderHead}
      />
    )
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(() => 'latest')
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword] = useDebounce(keyword, 500)
  const { repositories } = useRepositories(debouncedKeyword, selectedOrder)
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
      {...{ selectedOrder, setSelectedOrder, keyword, setKeyword }}
    />
  )
}

export default RepositoryList
