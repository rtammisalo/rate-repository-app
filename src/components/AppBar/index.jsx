import { View, ScrollView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../../theme'
import AppBarTab from './AppBarTab'
import useSignedInUser from '../../hooks/useSignedInUser'

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
  const { currentUser } = useSignedInUser()
  const signIn = {
    link: currentUser ? 'signout' : 'signin',
    content: currentUser ? 'Sign Out' : 'Sign In',
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollContainer}>
        <AppBarTab style={styles.child} linkTo="/" content={'Repositories'} />
        {currentUser && (
          <AppBarTab
            style={styles.child}
            linkTo="review"
            content="Create a review"
          />
        )}
        <AppBarTab
          style={styles.child}
          linkTo={signIn.link}
          content={signIn.content}
        />
      </ScrollView>
    </View>
  )
}

export default AppBar
