import { View, StyleSheet, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Text from './Text'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import useSignIn from '../hooks/useSignIn'

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
      <Pressable
        style={{ ...SignInFormStyle.child, ...SignInFormStyle.loginButton }}
        onPress={onSubmit}
      >
        <Text color={'textTertiary'} fontWeight={'bold'}>
          Sign in
        </Text>
      </Pressable>
    </View>
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

export default SignIn
