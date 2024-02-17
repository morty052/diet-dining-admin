import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const QuickLink = (props: Props) => {
  return (
    <TouchableOpacity className="mb-4  h-40 w-40 border border-gray-50 px-2 py-8 rounded-xl items-center justify-between">
      <Ionicons name="lock-closed" size={50} color="white" />
      <Text className="text-lg font-medium text-white">Secure Pass</Text>
    </TouchableOpacity>
  );
};

export const QuickLinks = (props: Props) => {
  return (
    <View className="flex-1 bg-gray-800 py-6 px-2">
      <View className="flex-1">
        <View className="px-2">
          <Text className="text-4xl text-gray-50 font-medium">
            Welcome Anthony
          </Text>
          <Text className="text-2xl text-gray-50 font-medium mt-2">
            Quick Links
          </Text>
        </View>
        <View className={styles.quickLinksContainer}>
          <QuickLink />
          <QuickLink />
          <QuickLink />
          <QuickLink />
        </View>
      </View>
      <TouchableOpacity className={styles.button}>
        <Text className="text-2xl font-medium">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
  quickLinksContainer:
    "flex-[0.8] flex-row flex-wrap justify-between p-4 border   mt-4 ",
};
