import { View, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
import Button from './Button'

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, 'Username must be 1 to 30 characters long')
    .max(30, 'Username must be 1 to 30 characters long')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be 5 to 50 characters long')
    .max(50, 'Password must be 5 to 50 characters long')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required'),
})

const SignUpFormStyle = StyleSheet.create({
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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={SignUpFormStyle.container}>
      <FormikTextInput
        style={{
          ...SignUpFormStyle.child,
          ...SignUpFormStyle.textInput,
          marginTop: 0,
        }}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={{ ...SignUpFormStyle.child, ...SignUpFormStyle.textInput }}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <FormikTextInput
        style={{ ...SignUpFormStyle.child, ...SignUpFormStyle.textInput }}
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Button
        content="Sign up"
        style={{ ...SignUpFormStyle.child, ...SignUpFormStyle.loginButton }}
        onPress={onSubmit}
      />
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      await signUp({ username, password })
      const { data } = await signIn({ username, password })
      console.log('Created a new account and signed in:', data)
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignUp
