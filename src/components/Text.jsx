import { Text as NativeText, StyleSheet } from 'react-native'

import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  appBarText: {
    color: theme.colors.appBarText,
  },
  repositoryItemLanguageText: {
    color: theme.colors.repositoryItemLanguageText
  },
  repositoryItemTextSecondary: {
    color: theme.colors.repositoryItemTextSecondary
  }
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'appBarText' && styles.appBarText,
    color === 'repositoryItemLanguageText' && styles.repositoryItemLanguageText,
    color === 'repositoryItemTextSecondary' && styles.repositoryItemTextSecondary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}

const Subheading = ({ ...props }) => {
  return <Text fontSize={'subheading'} {...props} />
}

const Heading = ({ ...props }) => {
  return <Text fontSize={'heading'} {...props} />
}

export { Text, Subheading, Heading }
export default Text
