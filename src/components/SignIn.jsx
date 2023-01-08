import { View, StyleSheet, Pressable } from 'react-native'
import { Formik } from 'formik'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'

const SignInFormStyle = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.viewBackground,
    padding: 15,
  },
  child: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
    padding: 15,
    alignItems: 'center',
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={SignInFormStyle.container}>
      <FormikTextInput
        style={{ ...SignInFormStyle.child, ...SignInFormStyle.textInput, marginTop: 0 }}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={{ ...SignInFormStyle.child, ...SignInFormStyle.textInput }}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Pressable
        style={{ ...SignInFormStyle.child, ...SignInFormStyle.loginButton }}
        onPress={onSubmit}
      >
        <Text color={'textTertiary'} fontWeight={'bold'}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={{}} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
