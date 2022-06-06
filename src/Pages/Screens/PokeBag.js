import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PokeBag = () => {
  return (
    <View style={styles.container}>
      <Text>PokeBag</Text>
    </View>
  )
}

export default PokeBag

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})