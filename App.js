import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import AddChat from "./Screens/AddChat";
import RegisterSceen from "./Screens/RegisterSceen";
import Chat from "./Screens/Chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { auth } from "./firebase";
import { navigationRef } from "./RootNavigation";
import * as RootNavigation from "./RootNavigation";

const Stack = createStackNavigator();

  const globalScreenStyles = {
    headerStyle: { backgroundColor: "#38d49d" },
    headerTitleStyle: { color: "#0b5139" },
    headerTintColor: "#2C5F2DFF",
    headerTitleAlign: "center",
  };

export default function App() {
  
  const addChat = () => {
    RootNavigation.navigate("AddChat");
  };
  console.disableYellowBox = true;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={globalScreenStyles}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <View
                style={{
                  marginLeft: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 80,
                  marginRight: 20,
                }}
              >
                <TouchableOpacity>
                  <AntDesign
                    name="camerao"
                    size={24}
                    color="#0b5139"
                    // style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <SimpleLineIcons
                    name="pencil"
                    onPress={addChat}
                    size={24}
                    color="#0b5139"
                    // style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
                
              </View>
            ),
          }}
        />
        <Stack.Screen name="Register" component={RegisterSceen} />
        <Stack.Screen name="AddChat" component={AddChat} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
      <StatusBar style="auto" />
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
