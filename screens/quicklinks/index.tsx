import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import { deleteKey } from "../../utils/secureStore";

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
  {
    link: "IdentifyMealScreen",
    icon: "notifications-outline",
    title: "Genie",
  },
];

const QuickLink = ({ title, icon, onPress }: QuickLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" border h-28 w-40 border-gray-50 px-2  mb-4 rounded-xl items-center justify-center"
    >
      <Ionicons name={icon as any} size={40} color="white" />
      <Text className="text-[16px] font-medium text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export const QuickLinks = () => {
  const navigation = useNavigation();

  const _id = "RDy0NRgK4s4Oz2Kxq9tuZw";

  function OnPress(title: string) {
    console.info("Pressed", title);
    // @ts-ignore
    navigation.navigate(title);
  }

  return (
    <View className="flex-1  bg-gray-800 pt-2 pb-6 px-2">
      <View className="flex-1">
        <View className="px-2">
          <Text className="text-4xl text-gray-50 font-medium">
            Welcome Anthony
          </Text>
          <Text
            style={{ color: Colors.link }}
            className="text-2xl text-gray-50 font-medium mt-2"
          >
            Customize
          </Text>
        </View>
        <ScrollView>
          <View className={styles.quickLinksContainer}>
            {quickLinksArray.map((qlink) => (
              <QuickLink
                key={qlink.title}
                title={qlink.title}
                icon={qlink.icon}
                onPress={() => OnPress(qlink.link)}
              />
            ))}
            <QuickLink
              title={"Preview Store"}
              icon={"eye"}
              onPress={() =>
                // @ts-ignore
                navigation.navigate("PreviewStore", {
                  _id,
                })
              }
            />
            {/* <TouchableOpacity className="w-full mt-6">
              <Text className="text-center text-gray-50 text-2xl font-medium">
                Customize Actions
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={async () => {
          await deleteKey("ONBOARDED");
        }}
        className={styles.button}
      >
        <Text className="text-2xl font-medium">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg m-2",
  quickLinksContainer:
    " flex-wrap  flex-row justify-between  px-4 py-2 border border-white/40 rounded-md  mt-4 ",
};
