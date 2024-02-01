import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Home';
import NoteAdd from './src/NoteAdd';
import Header from './src/Header'; // Import the custom header component
import NoteUpdate from './src/NoteUpdate';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <Header {...props} />, // Use the custom header component
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ title: 'My Notes' }} />
        <Stack.Screen name="NoteAdd" component={NoteAdd} options={{ title: 'Add Notes' }} />
        <Stack.Screen name="NoteUpdate" component={NoteUpdate} options={{ title: 'Update Notes' }} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
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