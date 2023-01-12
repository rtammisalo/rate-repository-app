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
    marginLeft: 15,
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
        {currentUser && (
          <AppBarTab
            style={styles.child}
            linkTo="userreviews"
            content="My reviews"
          />
        )}
        <AppBarTab
          style={styles.child}
          linkTo={signIn.link}
          content={signIn.content}
        />
        {!currentUser && (
          <AppBarTab style={styles.child} linkTo="signup" content="Sign up" />
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
