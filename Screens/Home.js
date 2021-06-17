import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { auth } from "../firebase";
import { Button, Input, Text, ListItem, Avatar } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomListItem from '../Components/CustomListItem'

const Home = ({ navigation }) => {
  const signout = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        navigation.replace("Login");
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <SafeAreaView>
      <CustomListItem />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
