import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export const Screen = ({ children }: Props) => {
  return <View className="bg-gray-800 flex-1 px-2">{children}</View>;
};

const styles = StyleSheet.create({});
