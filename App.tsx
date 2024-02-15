import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Appstack from "./routes/Appstack";

type Props = {};

const App = (props: Props) => {
  return (
    <NavigationContainer>
      <Appstack />
    </NavigationContainer>
  );
};

export default App;
