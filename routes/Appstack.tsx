import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { NavBar } from "../components";
import { GenerateOtpScreen, LoginPage } from "../screens";

type rootStackParams = {
  Home: undefined;
  Login: undefined;
  GenerateOtp: undefined;
};

const Stack = createNativeStackNavigator<rootStackParams>();

const Appstack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="Login"
        component={LoginPage}
      />
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="GenerateOtp"
        component={GenerateOtpScreen}
      />
    </Stack.Navigator>
  );
};

export default Appstack;
