import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

export const NavBar = (props: Props) => {
  return (
    <SafeAreaView className="bg-gray-800 ">
      <View className="py-2 px-4 bg-gray-800 border-b border-white">
        <Text className="text-2xl text-gray-50 font-medium">NavBar</Text>
      </View>
    </SafeAreaView>
  );
};
