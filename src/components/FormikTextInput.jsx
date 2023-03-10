import { StyleSheet } from 'react-native'
import { useField } from 'formik'

import TextInput from './TextInput'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  errorBorder: {
    color: theme.colors.textError,
  },
})

const FormikTextInput = ({ name, style, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  style.borderColor = showError ? styles.errorBorder.color : style.borderColor

  return (
    <>
      <TextInput
        onChangeText={(value) => {
          helpers.setTouched(true)
          helpers.setValue(value)
        }}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={style}
        {...props}
      />
      {showError && (
        <Text style={styles.errorText} color={'error'}>
          {meta.error}
        </Text>
      )}
    </>
  )
}

export default FormikTextInput
