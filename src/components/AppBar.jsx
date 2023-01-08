import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 20,
  },
  child: {
    marginLeft: 10
  }
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab style={styles.child} linkTo="/" content={'Repositories'} />
      <AppBarTab style={styles.child} linkTo="signin" content={'Sign in'} />
    </View>
  )
}

export default AppBar
