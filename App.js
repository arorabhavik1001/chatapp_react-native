import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import RegisterSceen from "./Screens/RegisterSceen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "./firebase";
import { navigationRef } from "./RootNavigation";
import * as RootNavigation from "./RootNavigation";

const Stack = createStackNavigator();

const globalScreenStyles = {
  headerStyle: { backgroundColor: "#38d49d" },
  headerTitleStyle: { color: "#0b5139" },
  headerTintColor: "#2C5F2DFF",
};

export default function App() {
  const signout = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        RootNavigation.replace("Login");
        console.log("Sign-out successful");
        setTimeout(() => {
          alert("You've been successfully signed out.");
        }, 650);
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={globalScreenStyles}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <MaterialCommunityIcons
                name="logout"
                size={24}
                color="#0b5139"
                onPress={signout}
                style={{ marginRight: 10 }}
              />
            ),
          }}
        />
        <Stack.Screen name="Register" component={RegisterSceen} />
      </Stack.Navigator>
      <StatusBar style="light" />
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
