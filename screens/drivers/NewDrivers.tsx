import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

type Props = {};

const NewDrivers = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>NewDrivers</Text>
    </View>
  );
};

export default NewDrivers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 10,
  },
});
