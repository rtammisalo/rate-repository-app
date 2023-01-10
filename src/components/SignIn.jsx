import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'
import Button from './Button'

const validationSchema = yup.object().shape({
  username: yup.mixed().required('Username is required'),
  password: yup.mixed().required('Password is required'),
})

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
    borderWidth: 0,
    padding: 15,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={SignInFormStyle.container}>
      <FormikTextInput
        style={{
          ...SignInFormStyle.child,
          ...SignInFormStyle.textInput,
          marginTop: 0,
        }}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={{ ...SignInFormStyle.child, ...SignInFormStyle.textInput }}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Button
        content="Sign in"
        style={{ ...SignInFormStyle.child, ...SignInFormStyle.loginButton }}
        onPress={onSubmit}
      />
    </View>
  )
}

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await signIn({ username, password })
      console.log(data)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
}

export default SignIn
