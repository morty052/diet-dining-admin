import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { baseUrl } from "../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const DriverProfile = ({ navigation, route }: any) => {
  const { driver } = route.params;

  const { firstname, lastname, avatar, phone, email } = driver ?? {};

  console.info(driver);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={{ uri: avatar }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <Text style={{ color: "white", fontSize: 24 }}>
        {firstname} {lastname}
      </Text>
      <Text style={{ color: "white", fontSize: 24 }}>{phone}</Text>
      <Text style={{ color: "white", fontSize: 24 }}>{email}</Text>
    </View>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
  },
});
