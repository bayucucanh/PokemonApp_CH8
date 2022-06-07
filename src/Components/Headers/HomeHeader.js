import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const HomeHeader = (props) => {
  const userId = props.userId
  console.log('User Id Header', userId);
  return (
    <TouchableOpacity style={styles.wrapper} onPress={() => props.navigation.navigate('PokeBag', {userId: userId})}>
      <Text style={styles.btnText}>PokeBag</Text>
    </TouchableOpacity>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 40,
    backgroundColor: '#e16c2c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  }
})