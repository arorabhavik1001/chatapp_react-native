import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../firebase";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat group",
    });
  }, [navigation]);
  const createChat = async () => {
    if (input === "") {
      alert("Please enter a chat name");
    } else {
      await db
        .collection("chats")
        .add({
          chatName: input,
        })
        .then(() => {
          navigation.goBack();
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter group name"
        placeholderTextColor="#0b51397e"
        value={input}
        style={{ marginTop: 20 }}
        leftIcon={
          <Icon
            name="wechat"
            type="antdesign"
            size={24}
            color="#0b5139"
            style={{ marginRight: 10 }}
          />
        }
        onChangeText={(text) => setInput(text)}
      />
      <Button
        title="Create new chat"
        buttonStyle={styles.buttonb}
        onPress={createChat}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonb: {
    backgroundColor: "#38d49d",
    marginTop: 15,
  },

  container: {
    height: "100%",
    backgroundColor: "#fff",
    padding: 30,
  },
});
export default AddChat;
