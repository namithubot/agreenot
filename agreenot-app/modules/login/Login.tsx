import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { loginUser } from './Login.Service';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Login to AgreeNot</Text>
      <Button title='LogIn' onPress={loginUser} />
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
