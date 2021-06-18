import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

const Chat = ({ navigation, route }) => {
  const [chatInput, setChatInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -30,
          }}
        >
          <Avatar
            rouded
            source={{
              uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text
            style={{
              color: "#0b5139",
              marginLeft: 10,
              fontWeight: "700",
              fontSize: 20,
            }}
          >
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Feather
              name="video"
              size={24}
              color="#0b5139"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="call-outline"
              size={24}
              color="#0b5139"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const sendMessage = () => {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.os === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>{/* chat */}</ScrollView>
          <View style={styles.footer}>
            <TextInput
              placeholder="Type a message..."
              style={styles.input}
              value={chatInput}
              onChangeText={(text) => {
                setChatInput(text);
              }}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons name="send" size={24} color="#38d49d" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
  },
  input: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#dbdbdb",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingBottom: 12,
    color: "#546c64",
    borderRadius: 30,
  },
});

export default Chat;
