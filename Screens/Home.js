import React, { useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase";
import { Button, Input, Text, Avatar } from "react-native-elements";
import CustomListItem from '../Components/CustomListItem'
import { SimpleLineIcons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const signiout = () => {
    auth
      .signOut()
      .then(function () {
        // Sign-out successful.
        navigation.replace("Login");
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
  useLayoutEffect(()=>{
    navigation.setOptions({
      title: 'BhavikUp',
       headerLeft: () => (
         <View style={{
          marginLeft: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: 80,
          marginRight: 20,
        }}>
           <TouchableOpacity>
           <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} /> 
           </TouchableOpacity>
           <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="logout"
                    size={24}
                    color="#0b5139"
                    onPress={signiout}
                    // style={{ marginRight: 10 }}
                  />
                </TouchableOpacity>
         </View>
       ),
      //  headerRight: () => (
      //    <View style={{marginLeft: 20}}>
      //      <TouchableOpacity>
      //      <AntDesign name="camerao" size={24} color="#0b5139" />
      //      </TouchableOpacity>
      //      <TouchableOpacity>
      //      <SimpleLineIcons name="pencil" size={24} color="#0b5139" />
      //      </TouchableOpacity>
      //    </View>
      //  )
        
    })
  })
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
