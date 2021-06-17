import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { Button, Input, Text } from "react-native-elements";

const AddChat = ({ navigation }) => {
  const [input, setInput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
    });
  }, [navigation]);
  return (
    <View>
      <Input placeholder="Enter chat name" value={input} onChangeText={(text) => setInput(text)} />
    </View>
  );
};

export default AddChat;
