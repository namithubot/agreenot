import { StatusBar } from 'expo-status-bar';
import { createContext, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Philo } from './modules/philo/Philo';

export default function App() {
  (window as any).global = window;
  (window as any).process = {
      env: { DEBUG: undefined },
  };

  return (
    <View style={styles.container}>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <Philo id='1' agreeCount={245} content='What you sow is what you reap.' disagreeCount={34} neutralCount={2} />
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
