import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { auth } from "../firebase";

const Login = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMatterShowing, setisMatterShowing] = useState(false);
  const [password, setPassword] = useState("");
  const login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imgUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((err) => {
        if(err.code==="auth/user-not-found"){alert(`Wrong Credetials. If you haven't created an account, please register`)}});
  };
  const taketoReg = () => {
    navigation.navigate("Register");
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      // setAuthy(authUser)
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    var myVar;
    myVar = setTimeout(() => {
      setIsAnimating(false);
      setisMatterShowing(true);
    }, 2000);

    // return clearTimeout(myVar)
  }, []);
  return (
    <View style={styles.containerm}>
      <ActivityIndicator
        size="large"
        color="#03a203"
        style={{ height: 80 }}
        hidesWhenStopped
        animating={isAnimating}
      />
      <StatusBar style="light" />
      {isMatterShowing ? (
        <KeyboardAvoidingView style={styles.container}>
          <Image
            source={{
              uri: "https://i.ibb.co/2g8vFfb/logomain.png",
            }}
            style={{ width: 200, height: 200 }}
            // transition={true}
          />
          <View style={styles.inputContainer}>
            <Input
              style={styles.input}
              placeholder="Email"
              autoFocus
              type="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={{
                type: "vector-icons",
                name: "mail",
                color: "#1a8f66",
              }}
            />

            <Input
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
              leftIcon={{
                type: "vector-icons",
                name: "lock",
                color: "#1a8f66",
              }}
            />
          </View>
          <Button
            title="Login"
            containerStyle={styles.button}
            buttonStyle={styles.buttonb}
            // raised={true}
            onPress={login}
            titleStyle={styles.btitle}
          />
          <Button
            title="Register"
            type="clear"
            titleStyle={styles.btitle2}
            containerStyle={styles.button2}
            onPress={taketoReg}
          />
        </KeyboardAvoidingView>
      ) : null}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // height: "100%",
    // padding: 10,
    marginBottom: 40,
    // backgroundColor: "#f1f1f1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerm: {
    height: "100%",
    backgroundColor: "#f1f1f1",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: 300,
    marginTop: 15,
  },
  button: {
    width: 200,
    backgroundColor: "#38d49d",
    marginTop: 15,
  },
  button2: {
    marginTop: 15,
    width: 200,
  },
  btitle: {
    // color: "#38d49d"
  },
  btitle2: {
    color: "#38d49d",
    borderColor: "#38d49d",
  },
  buttonb: {
    backgroundColor: "#38d49d",
  },
});
