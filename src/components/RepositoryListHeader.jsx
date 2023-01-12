import { StyleSheet, View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import theme from '../theme'
import { Searchbar } from 'react-native-paper'

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: theme.colors.mainBackground,
    margin: 10,
  },
})

const SearchContainer = ({ keyword, setKeyword }) => {
  const onChangeKeyword = (newKeyword) => setKeyword(newKeyword)

  return (
    <Searchbar
      placeholder="search for repositories"
      onChangeText={onChangeKeyword}
      value={keyword}
    />
  )
}

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
      <SearchContainer {...props} />
      <ListOrderPicker {...props} />
    </View>
  )
}

export default RepositoryListHeader
