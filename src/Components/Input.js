import { StyleSheet, Text, TextInput } from 'react-native'
import React from 'react'

const Input = () => {
  return (
    <TextInput style={styles.input}>
      <Text>Input</Text>
    </TextInput>
  )
}

export default Input

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff'
  }
})