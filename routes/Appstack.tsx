import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { NavBar } from "../components";
import {
  AffiliateStoreManager,
  GenerateOtpScreen,
  LoginPage,
  NotificationsManager,
  OrderScreen,
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
import PreviewStoreRoutes from "./PreviewStoreRoutes";
import Colors from "../constants/colors";
import BackButton from "../components/ui/BackButton";

type rootStackParams = {
  Home: undefined;
  Auth: undefined;
  Login: undefined;
  GenerateOtp: undefined;
  QuickLinks: undefined;
  StoresManager: undefined;
  AffiliateStoreManager: undefined;
  OrdersManager: undefined;
  NotificationsManager: undefined;
  IdentifyMealScreen: undefined;
  OnboardingRoutes: undefined;
  Order: {
    order_id: string;
    products: any[];
    total: number;
  };
  PreviewStore: {
    _id: string;
  };
};

const Stack = createNativeStackNavigator<rootStackParams>();

const Appstack = ({
  ONBOARDED,
  affiliate,
}: {
  ONBOARDED: boolean;
  affiliate?: boolean;
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.darkGrey },
        headerShadowVisible: false,
      }}
      initialRouteName={ONBOARDED ? "Auth" : "OnboardingRoutes"}
    >
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
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
        name="QuickLinks"
        component={QuickLinks}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "",
          headerTitleStyle: { color: "white" },
        }}
        name="GenerateOtp"
        component={GenerateOtpScreen}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          title: "Orders",
          headerTitleStyle: { color: "white" },
        }}
        name="NotificationsManager"
        component={NotificationsManager}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Orders",
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          // headerShown: false,
        }}
        name="OrdersManager"
        component={OrdersManager}
      />

      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
          title: "Store Manager",
          headerTitleStyle: { color: "white" },
        }}
        name="StoresManager"
        component={StoresManager}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "",
          headerTitleStyle: { color: "white" },
        }}
        name="AffiliateStoreManager"
        component={AffiliateStoreManager}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Order"
        component={OrderScreen}
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
        component={PreviewStoreRoutes}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          // headerTransparent: true,
          headerTitle: "",
          headerShown: false,
        }}
        name="IdentifyMealScreen"
        component={IdentifyMealScreen}
      />
    </Stack.Navigator>
  );
};

export default Appstack;
