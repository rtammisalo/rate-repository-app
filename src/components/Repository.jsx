import { View } from 'react-native'
import { useParams } from 'react-router-native'
import RepositoryItem from './RepositoryItem'
import useRepository from '../hooks/useRepository'
import Text from './Text'

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

  return <RepositoryItem item={repository} showLink />
}

export default Repository
