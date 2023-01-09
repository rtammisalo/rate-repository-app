import { View, ScrollView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 20,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  child: {
    marginLeft: 10,
  },
  // ...
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab style={styles.child} linkTo="/" content={'Repositories'} />
        <AppBarTab style={styles.child} linkTo="signin" content={'Sign in'} />
      </ScrollView>
    </View>
  )
}

export default AppBar
