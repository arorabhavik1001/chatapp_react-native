import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import {auth} from "../firebase";

const RegisterSceen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const registerUser = () => {
    auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        authUser.user.updateProfile({
            displayName: name,
            photoURL: imgUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        })
    }).catch(err => alert(err.message))
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 20, color: "#38d49d" }}>
        Create a Chat Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          type="text"
          value={email}
          onChangeText={(text) => setMail(text)}
        />
        <Input
          placeholder="Password"
          type="text"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture url (optional)"
          type="text"
          value={imgUrl}
          onChangeText={(text) => setImgUrl(text)}
          onSubmitEditing={registerUser}
        />
      </View>
      <Button 
        title="Register"
        onPress={registerUser}
        raised
        buttonStyle={styles.button}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
    backgroundColor: "#f1f1f1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
    marginBottom: 15,
  },
  button: {
    width: 200,
    backgroundColor: "#38d49d",
    // marginTop: 15,
  },
});

export default RegisterSceen;
