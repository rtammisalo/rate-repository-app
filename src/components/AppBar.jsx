import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 20,
    paddingLeft: 15,
    // ...
  },
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab content={'Repositories'} />
    </View>
  )
}

export default AppBar
