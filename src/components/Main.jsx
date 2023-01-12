import { StyleSheet, View } from 'react-native'
import { Routes, Route, Navigate } from 'react-router-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import theme from '../theme'
import SignIn from './SignIn'
import SignOut from './SignOut'
import SignUp from './SignUp'
import Repository from './Repository'
import ReviewRepository from './ReviewRepository'
import UserReviews from './UserReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="repository/:id" element={<Repository />} exact />
        <Route path="userreviews" element={<UserReviews />} exact />
        <Route path="review" element={<ReviewRepository />} exact />
        <Route path="signin" element={<SignIn />} exact />
        <Route path="signout" element={<SignOut />} exact />
        <Route path="signup" element={<SignUp />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
