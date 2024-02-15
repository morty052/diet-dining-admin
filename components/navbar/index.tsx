import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import {} from "react-native-safe-area-context";

type Props = {};

export const NavBar = (props: Props) => {
  return (
    <SafeAreaView className="">
      <View className="py-2 px-4 bg-white">
        <Text className="text-2xl text-bl">NavBar</Text>
      </View>
    </SafeAreaView>
  );
};
