import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { NavBar } from "../components";
import {
  GenerateOtpScreen,
  LoginPage,
  NotificationsManager,
  OrdersManager,
  QuickLinks,
  StoresManager,
} from "../screens";

type rootStackParams = {
  Home: undefined;
  Login: undefined;
  GenerateOtp: undefined;
  QuickLinks: undefined;
  StoresManager: undefined;
  OrdersManager: undefined;
  NotificationsManager: undefined;
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
        name="QuickLinks"
        component={QuickLinks}
      />
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="GenerateOtp"
        component={GenerateOtpScreen}
      />
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="NotificationsManager"
        component={NotificationsManager}
      />
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="OrdersManager"
        component={OrdersManager}
      />
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="StoresManager"
        component={StoresManager}
      />
    </Stack.Navigator>
  );
};

export default Appstack;
