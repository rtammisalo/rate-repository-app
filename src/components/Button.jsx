import { Pressable, StyleSheet } from 'react-native'
import theme from '../theme'
import Text from './Text'

const defaultStyle = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    borderWidth: 0,
    padding: 15,
    alignItems: 'center',
  },
})

const Button = ({ content, style, onPress }) => {
  return (
    <Pressable style={{ ...defaultStyle.button, ...style }} onPress={onPress}>
      <Text color={'textTertiary'} fontWeight={'bold'}>
        {content}
      </Text>
    </Pressable>
  )
}

export default Button
