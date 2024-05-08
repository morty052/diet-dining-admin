import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { getItem } from "../../utils/storage";

type Props = {};

const Avatar = () => {
  const avatar = getItem("admin_avatar");
  return (
    <View>
      <Image source={{ uri: avatar }} style={styles.image} resizeMode="cover" />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {},
  image: { width: 30, height: 30, borderRadius: 100 },
});
