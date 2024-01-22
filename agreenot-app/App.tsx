import { StatusBar } from 'expo-status-bar';
import { createContext, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  (window as any).global = window;
  (window as any).process = {
      env: { DEBUG: undefined },
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
