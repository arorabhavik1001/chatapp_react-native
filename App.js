import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/LoginScreen'
import Home from './Screens/Home'
import RegisterSceen from './Screens/RegisterSceen'

const Stack = createStackNavigator();

const globalScreenStyles={
  headerStyle: {backgroundColor:'#38d49d'},
  headerTitleStyle: {color: '#0b5139'},
  headerTintColor: "#2C5F2DFF"
}

export default function App() {
  return (
     <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenStyles}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={RegisterSceen} />
      </Stack.Navigator>
      <StatusBar style="light"/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});