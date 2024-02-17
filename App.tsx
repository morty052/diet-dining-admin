import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Appstack from "./routes/Appstack";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

type Props = {};

const prefix = Linking.createURL("/");

const App = (props: Props) => {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <ClerkProvider publishableKey="pk_test_Zmxvd2luZy1waXJhbmhhLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ">
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <Appstack />
      </NavigationContainer>
    </ClerkProvider>
  );
};

export default App;
