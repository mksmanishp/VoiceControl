import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import VoiceControlledGrid from './src/screens/VoiceControlledGrid';
import { moderateScale } from 'react-native-size-matters';
import VoiceControlGridNative from './src/screens/VoiceControlGridNative';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <VoiceControlledGrid />
        {/* <VoiceControlGridNative /> */}
      </View>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(50),
    justifyContent: "center", alignItems: "center"
  }
})