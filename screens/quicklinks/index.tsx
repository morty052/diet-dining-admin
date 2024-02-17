import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type QuickLinkProps = {
  title: string;
  icon: string;
  onPress: () => void;
};

const quickLinksArray = [
  {
    link: "GenerateOtp",
    icon: "lock-closed-outline",
    title: "Generate OTP",
  },
  {
    link: "StoresManager",
    icon: "storefront-outline",
    title: "Manage Stores",
  },
  {
    link: "OrdersManager",
    icon: "bag-outline",
    title: "Manage Orders",
  },
  {
    link: "NotificationsManager",
    icon: "notifications-outline",
    title: "Notifications",
  },
];

const QuickLink = ({ title, icon, onPress }: QuickLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4  h-40 w-40 border border-gray-50 px-2 py-8 rounded-xl items-center justify-between"
    >
      <Ionicons name={icon as any} size={50} color="white" />
      <Text className="text-lg font-medium text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export const QuickLinks = () => {
  const navigation = useNavigation();

  function OnPress(title: string) {
    console.info("Pressed", title);
    // @ts-ignore
    navigation.navigate(title);
  }

  return (
    <View className="flex-1 bg-gray-800 pt-2 pb-6 px-2">
      <View className="flex-1">
        <View className="px-2">
          <Text className="text-4xl text-gray-50 font-medium">
            Welcome Anthony
          </Text>
          <Text className="text-2xl text-gray-50 font-medium mt-2">
            Quick Links
          </Text>
        </View>
        <View className={styles.quickLinksContainer}>
          {quickLinksArray.map((qlink) => (
            <QuickLink
              key={qlink.title}
              title={qlink.title}
              icon={qlink.icon}
              onPress={() => OnPress(qlink.link)}
            />
          ))}
          <TouchableOpacity className="w-full mt-6">
            <Text className="text-center text-gray-50 text-2xl font-medium">
              Customize Actions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity className={styles.button}>
        <Text className="text-2xl font-medium">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg m-2",
  quickLinksContainer:
    "flex-[0.8] flex-row flex-wrap justify-between p-4 border   mt-4 ",
};
