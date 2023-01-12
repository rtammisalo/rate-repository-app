import { StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import theme from '../theme'

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.mainBackground,
    margin: 10,
  },
})

const ListOrderPicker = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <Picker
      selectedValue={selectedOrder}
      onValueChange={(itemValue) => setSelectedOrder(itemValue)}
      prompt="Select an item..."
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="descRating" />
      <Picker.Item label="Lowest rated repositories" value="ascRating" />
    </Picker>
  )
}

const RepositoryListHeader = (props) => {
  return (
    <View style={styles.headerContainer}>
      <ListOrderPicker {...props} />
    </View>
  )
}

export default RepositoryListHeader
