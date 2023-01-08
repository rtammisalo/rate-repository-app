import { Pressable } from 'react-native'
import { Link } from 'react-router-native'
import { Heading } from './Text'

const AppBarTab = ({ style, linkTo, content }) => {
  return (
    <Pressable style={style}>
      <Link to={linkTo}>
        <Heading color={'textTertiary'} fontWeight={'bold'}>
          {content}
        </Heading>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
