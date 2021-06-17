import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Input, Text, ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <TouchableOpacity>
    <ListItem>
      <TouchableOpacity activeOpacity={0.5}>
      <Avatar
        rounded
        source={{
          uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        }}
      />
      </TouchableOpacity>
      <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "700" }}>
            Chat 1
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            This is a subtitle for this line. This is a subtitle for this line.
          </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default CustomListItem;

