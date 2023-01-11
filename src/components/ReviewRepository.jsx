import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormikTextInput from './FormikTextInput'
import theme from '../theme'
import Button from './Button'
import useCreateReview from '../hooks/useCreateReview'
import { useNavigate } from 'react-router-native'

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating has to be an integer')
    .integer('Rating has to be an integer')
    .min(0, 'Rating has to be between 0 and 100')
    .max(100, 'Rating has to be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.viewBackground,
    padding: 15,
  },
  textInput: {
    borderColor: theme.colors.textSecondary,
  },
  formChild: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
  },
  submitButton: {
    borderWidth: 0,
    padding: 15,
  },
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={{ ...styles.formChild, ...styles.textInput, marginTop: 0 }}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={[styles.formChild, styles.textInput]}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        style={[styles.formChild, styles.textInput]}
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        style={[styles.formChild, styles.textInput]}
        name="text"
        placeholder="Review"
        multiline
      />
      <Button
        content="Create a review"
        style={[styles.formChild, styles.submitButton]}
        onPress={onSubmit}
      />
    </View>
  )
}

const ReviewRepository = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    values.rating = Number(values.rating)
    const repositoryId = await createReview(values)
    navigate(`/repository/${repositoryId}`)
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default ReviewRepository
