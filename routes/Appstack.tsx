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
  SettingsScreen,
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
import RegisterScreen from "../screens/onboarding-screens/RegisterScreen";
import { ConfirmOtpScreen } from "../screens/onboarding-screens/ConfirmOtpScreen";
import SettingsButton from "../components/ui/SettingsButton";
import ProjectManagerStack from "./ProjectManagerStack";
import DriverStack from "./DriverStack";

type rootStackParams = {
  Home: undefined;
  Unlock: undefined;
  Register: undefined;
  Login: undefined;
  OtpScreen: {
    emailAddress: string;
    isAdmin: boolean;
  };
  GenerateOtp: undefined;
  QuickLinks: undefined;
  Settings: undefined;
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
  ProjectManagerStack: undefined;
  DriverStack: undefined;
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
      initialRouteName={ONBOARDED ? "Unlock" : "Register"}
    >
      <Stack.Screen
        options={{
          // header: () => <NavBar />,
          headerShown: false,
        }}
        name="Unlock"
        component={PassCodeScreen}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="OnboardingRoutes"
        component={OnboardingRoutes}
      /> */}
      <Stack.Screen
        options={{
          header: () => <NavBar />,
        }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginPage}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar />,
          headerShown: false,
        }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar />,
          headerShown: false,
        }}
        name="OtpScreen"
        component={ConfirmOtpScreen}
      />
      <Stack.Screen
        options={{
          // header: () => <NavBar minimal />,
          title: "Quick links",
          headerTitleStyle: { color: "white" },
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerRight: () => <SettingsButton />,
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
          headerLeft: () => <BackButton />,
          title: "Settings",
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "",
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
          // headerLeft: () => <BackButton />,
          // headerTitleAlign: "center",
          // title: "Store Manager",
          // headerTitleStyle: { color: "white" },
          headerShown: false,
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
          // headerLeft: () => <BackButton />,
          // headerShown: true,
          // headerTitle: "",
          headerShown: false,
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
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShown: false,
        }}
        name="ProjectManagerStack"
        component={ProjectManagerStack}
      />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShown: false,
        }}
        name="DriverStack"
        component={DriverStack}
      />
    </Stack.Navigator>
  );
};

export default Appstack;
