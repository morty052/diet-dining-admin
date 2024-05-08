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
import { getItem } from "../../utils/storage";
import { useClerk } from "@clerk/clerk-expo";

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
    link: "DriverStack",
    icon: "car-outline",
    title: "Drivers",
  },
  {
    link: "IdentifyMealScreen",
    icon: "cloud-outline",
    title: "Genie",
  },
];

const AdminLinks = () => {
  const firstname = getItem("firstname");

  const navigation = useNavigation<any>();

  function OnPress(title: string) {
    console.info("Pressed", title);
    // @ts-ignore
    navigation.navigate(title);
  }

  const handleLock = async () => {
    navigation.navigate("Unlock");
  };

  return (
    <View
      style={{
        backgroundColor: Colors.darkGrey,
        flex: 1,
        paddingTop: 12,
        paddingBottom: 24,
      }}
    >
      <View className="flex-1 px-2">
        <View className="px-2">
          <Text className="text-2xl text-gray-50 font-medium">
            Welcome {firstname}
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
              title={"Projects"}
              icon={"business"}
              onPress={() => navigation.navigate("ProjectManagerStack")}
            />
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleLock} className={styles.button}>
        <Text className="text-2xl font-medium">Lock</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export const QuickLinks = ({ route }: any) => {
  const avatar = getItem("avatar");
  console.info(avatar);
  return <AdminLinks />;
};

const styles = {
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg m-2",
  quickLinksContainer:
    " flex-wrap  flex-row justify-between  px-4 py-2 border border-white/40 rounded-md  mt-4 ",
};
