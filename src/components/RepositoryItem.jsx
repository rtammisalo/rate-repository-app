import { View, StyleSheet, Image } from 'react-native'
import { Text } from './Text'
import theme from '../theme'

const ItemDetailsStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatarImage: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    paddingRight: 15,
    flexGrow: 0,
  },
  detailsContainer: {
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
  },
  detailsChild: {
    marginTop: 8,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    flexGrow: 0,
    alignSelf: 'flex-start',
    padding: 3,
  },
})

const RepositoryItemDetails = ({ item }) => {
  return (
    <View style={ItemDetailsStyle.container}>
      <View style={ItemDetailsStyle.avatarContainer}>
        <Image
          style={ItemDetailsStyle.avatarImage}
          source={{ uri: item.ownerAvatarUrl }}
        />
      </View>
      <View style={ItemDetailsStyle.detailsContainer}>
        <Text fontWeight={'bold'}>{item.fullName}</Text>
        <Text style={ItemDetailsStyle.detailsChild} color={'textSecondary'}>
          {item.description}
        </Text>
        <Text
          style={{
            ...ItemDetailsStyle.detailsChild,
            ...ItemDetailsStyle.language,
          }}
          color="textTertiary"
        >
          {item.language}
        </Text>
      </View>
    </View>
  )
}

const ItemMetaDataStyle = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  metaDataContent: {
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 1,
  },
})

const textifyCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count.toString()
}

const MetaDataView = ({ count, label }) => {
  return (
    <View style={ItemMetaDataStyle.metaDataContent}>
      <Text fontWeight={'bold'}>{textifyCount(count)}</Text>
      <Text color={'textSecondary'}>{label}</Text>
    </View>
  )
}

const RepositoryItemMetaData = ({ item }) => {
  return (
    <View style={ItemMetaDataStyle.content}>
      <MetaDataView count={item.stargazersCount} label={'Stars'} />
      <MetaDataView count={item.forksCount} label={'Forks'} />
      <MetaDataView count={item.reviewCount} label={'Reviews'} />
      <MetaDataView count={item.ratingAverage} label={'Rating'} />
    </View>
  )
}

const RepositoryItemStyle = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'stretch',
    backgroundColor: theme.colors.viewBackground,
  },
})

const RepositoryItem = ({ item }) => {
  return (
    <View style={RepositoryItemStyle.container} testID="repositoryItem">
      <RepositoryItemDetails item={item} />
      <RepositoryItemMetaData item={item} />
    </View>
  )
}

export default RepositoryItem
