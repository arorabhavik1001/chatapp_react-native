import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth, db, storage } from "../firebase";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

const RegisterSceen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [downloadedUrl, setDownloadedUrl] = useState("");
  const registerUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imgUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((err) => alert(err.message));
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImgUrl(result.uri);
    }
    // uploadImage(result.uri);
  };
  const uploadImage = async (imgUrl) => {
    const image = await urlToBlob(imgUrl);
    firebase
      .storage()
      .ref(`imgMessages/${name}.png`)
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        setDownloadedUrl(url);
        console.log(url);
      })
      .catch((error) => {
        alert(
          "Error uploading the image, other people might not be able to see the image"
        );
        console.log(`hua nhi`);
        console.log(error);
        setDownloadedUrl(
          "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
        );
      });
  };

  const urlToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(
          new Error(
            "Error uploading the image, other people might not be able to see the image"
          )
        );
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
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
        {/* <Button title="Choose profile picture" onPress={pickImage} /> */}
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
