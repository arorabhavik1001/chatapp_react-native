import React, { useLayoutEffect, useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, Text, Icon, Input, Image } from "react-native-elements";
import { AntDesign, FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import { db, auth } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import moment from "moment";

const Chat = ({ navigation, route }) => {
  const scrollViewRef = useRef();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [messsages, setMesssages] = useState([]);
  const [imgUrl, setImgUrl] = useState("");
  const [imgSource, setImgSource] = useState("");
  const [imgArray, setImgArray] = useState([]);
  useEffect(() => {
    setImgArray([...imgArray, imgSource]);
  }, [imgSource]);
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
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
            rounded
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
      headerBackTitleVisible: false,
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity>
            <Feather
              name="video"
              size={24}
              color="#0b5139"
              style={{ marginRight: 20 }}
              onPress={() => alert("Feature coming soon")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="call-outline"
              size={24}
              color="#0b5139"
              style={{ marginRight: 20 }}
              onPress={() => alert("Feature coming soon")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    db.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMesssages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  }, [route]);

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

    if (!result.cancelled) {
      setImgUrl(result.uri);
      console.log(result.uri, "ok");
    }
    sendImage(result.uri);
  };
  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: chatInput,
      subtitle: chatInput,
      image: "",
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });
    setChatInput("");
    setImgUrl("");
  };
  const sendImage = (imgURLL) => {
    Keyboard.dismiss();
    uploadImage(imgURLL);
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: chatInput,
      subtitle: "Image",
      image: imgSource,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setChatInput("");
  };

  const uploadImage = async (imgURLL) => {
    const image = await urlToBlob(imgURLL);
    firebase
      .storage()
      .ref(`imgMessages/${moment().format()}.png`)
      .put(image)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => {
        setImgSource(url);
        console.log(url);
      })
      .catch((error) => {
        alert(
          "Error uploading the image, other people might not be able to see the image"
        );
        console.log(`hua nhi`);
        console.log(error);
        setImgSource(
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
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.os === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            {/* <ScrollView contentContainerStyle={{paddingTop: 15}}> */}
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
              contentContainerStyle={{ paddingTop: 15 }}
            >
              {messages.map(({ id, data }) =>
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Text style={styles.receiverText}>{data.message}</Text>
                    {data.image != "" ? (
                      <Image
                        source={{
                          uri: data.image,
                        }}
                        style={{ width: 200, height: 200, borderRadius: 20 }}
                        // transition={true}
                      />
                    ) : null}
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      size={30}
                      source={{ uri: data.photoURL }}
                      rounded
                    />
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Avatar
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      position="absolute"
                      bottom={-15}
                      left={-5}
                      source={{ uri: data.photoURL }}
                      size={30}
                      rounded
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    {data.image != "" ? (
                      <Image
                        source={{
                          uri: data.image,
                        }}
                        style={{ width: 200, height: 200, borderRadius: 20 }}
                        // transition={true}
                      />
                    ) : null}
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              )}
            </ScrollView>

            <View style={styles.footer}>
              <Ionicons
                name="attach"
                size={24}
                color="#0b5139"
                // onPress={pickImage}
                onPress={() => alert("Feature coming soon")}
                />
              <TextInput
                placeholder="Type a message..."
                style={styles.input}
                onSubmitEditing={sendMessage}
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#38d49d4e",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  footer: {
    width: "100%",
    alignItems: "center",
    padding: 15,
    flexDirection: "row",
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 7,
    paddingRight: 10,
    fontSize: 10,
    bottom: -6,
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
