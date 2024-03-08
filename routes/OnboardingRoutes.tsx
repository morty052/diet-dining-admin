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
import PassCodeScreen from "../screens/passcode-screen";
import RegisterScreen from "../screens/onboarding-screens/RegisterScreen";
import { ConfirmOtpScreen } from "../screens/onboarding-screens/ConfirmOtpScreen";

type rootStackParams = {
  Auth: undefined;
  Login: undefined;
  OtpScreen: {
    emailAddress: string;
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

const OnboardingRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen
        options={{
          // header: () => <NavBar />,
          headerShown: false,
        }}
        name="Auth"
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
    </Stack.Navigator>
  );
};

export default OnboardingRoutes;
