import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { auth, db } from "../firebase";
import { Avatar } from "react-native-elements";
import CustomListItem from "../Components/CustomListItem";
import {
  MaterialCommunityIcons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const addChat = () => {
    navigation.navigate("AddChat");
  };
  const [chats, setChats] = useState([]);
  // const [visible, setIsVisible] = useState(false);
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
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    });
  };
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);
  const images = [
    {
      uri: auth?.currentUser?.photoURL,
    },
  ];
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "BhavikUp",
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
              onPress={() => alert("Feature coming soon")}
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
      headerLeft: () => (
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
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
    });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
