import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import VoiceControlledGrid from './src/components/VoiceControlledGrid'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <VoiceControlledGrid />
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(50),
    flex: 1, justifyContent: "center", alignItems: "center"
  }
})