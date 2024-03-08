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
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PreviewStoreScreen from "../screens/preview-store-screen";
import PassCodeScreen from "../screens/passcode-screen";
import IdentifyMealScreen from "../components/image-analyzer";
import OnboardingRoutes from "./OnboardingRoutes";

type rootStackParams = {
  Home: undefined;
  Auth: undefined;
  Login: undefined;
  GenerateOtp: undefined;
  QuickLinks: undefined;
  StoresManager: undefined;
  OrdersManager: undefined;
  NotificationsManager: undefined;
  IdentifyMealScreen: undefined;
  OnboardingRoutes: undefined;
  PreviewStore: {
    _id: string;
  };
};

const Stack = createNativeStackNavigator<rootStackParams>();

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex flex-row items-center gap-2 bg-red-300"
      onPress={() => navigation.goBack()}
    >
      <Ionicons size={28} color={"white"} name="chevron-back" />
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

const Appstack = ({ ONBOARDED }: { ONBOARDED: boolean }) => {
  return (
    <Stack.Navigator initialRouteName={ONBOARDED ? "Auth" : "OnboardingRoutes"}>
      <Stack.Screen
        options={{
          // header: () => <NavBar />,
          headerShown: false,
        }}
        name="Auth"
        component={PassCodeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="OnboardingRoutes"
        component={OnboardingRoutes}
      />
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
          // header: () => <NavBar minimal />,
          title: "Quick links",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "rgb(31 41 55)" },
        }}
        name="QuickLinks"
        component={QuickLinks}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          title: "",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "rgb(31 41 55)" },
        }}
        name="GenerateOtp"
        component={GenerateOtpScreen}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          title: "Orders",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "rgb(31 41 55)" },
        }}
        name="NotificationsManager"
        component={NotificationsManager}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          title: "Orders",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "rgb(31 41 55)" },
        }}
        name="OrdersManager"
        component={OrdersManager}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          title: "Store Manager",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "rgb(31 41 55)" },
        }}
        name="StoresManager"
        component={StoresManager}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          headerShown: true,
          // headerTransparent: true,
          headerTitle: "",
          // headerBackVisible: false,
        }}
        name="PreviewStore"
        component={PreviewStoreScreen}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          headerShown: false,
          // headerTransparent: true,
          headerTitle: "",
          // headerBackVisible: false,
        }}
        name="IdentifyMealScreen"
        component={IdentifyMealScreen}
      />
    </Stack.Navigator>
  );
};

export default Appstack;
