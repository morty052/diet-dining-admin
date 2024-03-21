import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SocketContextComponent from "../contexts/SocketContextComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreviewStoreScreen from "../screens/preview-store-screen";

type Props = {};

const Stack = createNativeStackNavigator();

const PreviewStoreRoutes = (props: Props) => {
  return (
    <SocketContextComponent>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreviewStore" component={PreviewStoreScreen} />
      </Stack.Navigator>
    </SocketContextComponent>
  );
};

export default PreviewStoreRoutes;

const styles = StyleSheet.create({});
