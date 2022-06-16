import { StyleSheet, View, ActivityIndicator, StatusBar } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <StatusBar
        backgroundColor={'#7fad71'}
        />
      <ActivityIndicator size="large" color="#fff"  />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#7fad71'
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})