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
    const getOnPress = this.props.getOnPress ? this.props.getOnPress : () => {}
    const onEndReached = this.props.onEndReached
      ? this.props.onEndReached
      : () => {}

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <RepositoryItemContainer item={item} onPress={getOnPress(item)} />
        )}
        ListHeaderComponent={this.renderHead}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    )
  }
}

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState(() => 'latest')
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword] = useDebounce(keyword, 500)
  const { repositories, fetchMore } = useRepositories(
    debouncedKeyword,
    selectedOrder
  )
  const navigate = useNavigate()

  const getOnPress = (item) => {
    return () => {
      navigate(`/repository/${item.id}`)
    }
  }

  const onEndReached = () => {
    fetchMore()
  }

  return (
    <RepositoryListContainer
      {...{
        repositories,
        getOnPress,
        selectedOrder,
        setSelectedOrder,
        keyword,
        setKeyword,
        onEndReached,
      }}
    />
  )
}

export default RepositoryList
