import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Screen } from "../../components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

type Props = {};

export const StoresManager = (props: Props) => {
  return (
    <Screen>
      <Text>Store manager</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({});
