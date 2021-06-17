import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Text, ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "700" }}>
            Chat 1
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            This is a subtitle for this line. This is a subtitle for this line.
          </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};
const styles = StyleSheet.create({});

export default CustomListItem;

