import { Pressable } from 'react-native'
import { Heading } from './Text'

const AppBarTab = ({ content }) => {
  return (
    <Pressable>
      <Heading color={'appBarText'} fontWeight={'bold'}>
        {content}
      </Heading>
    </Pressable>
  )
}

export default AppBarTab
