import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllDrivers from "../screens/drivers/AllDrivers";
import NewDrivers from "../screens/drivers/NewDrivers";
import BackButton from "../components/ui/BackButton";
import Colors from "../constants/colors";
import DriverProfile from "../screens/drivers/DriverProfile";

type Props = {};

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const DriverTabs = (props: Props) => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.darkGrey },
      }}
    >
      <Tabs.Screen
        name="AllDrivers"
        options={{ tabBarLabel: "Verified" }}
        component={AllDrivers}
      />
      <Tabs.Screen
        options={{ tabBarLabel: "Unverified" }}
        name="NewDrivers"
        component={NewDrivers}
      />
    </Tabs.Navigator>
  );
};

const DriverStack = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
          title: "Driver",
          headerTitleStyle: { color: "white" },
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.darkGrey,
          },
        }}
        name="Drivers"
        component={DriverTabs}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { color: "white" },
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.darkGrey,
          },
        }}
        name="DriverProfile"
        component={DriverProfile}
      />
    </Stack.Navigator>
  );
};

export default DriverStack;
