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
import { getItem, removeItem } from "../../utils/storage";
import { useClerk } from "@clerk/clerk-expo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
    icon: "cloud-outline",
    title: "Genie",
  },
];

const affiliateLinksArray = [
  {
    link: "GenerateOtp",
    icon: "lock-closed-outline",
    title: "Generate OTP",
  },
  {
    link: "AffiliateStoreManager",
    icon: "storefront-outline",
    title: "Manage Store",
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
    icon: "cloud-outline",
    title: "Genie",
  },
];

const Stack = createNativeStackNavigator();

const AffiliateLinks = () => {
  const store_name = getItem("store_name");

  const _id = "RDy0NRgK4s4Oz2Kxq9tuZw";

  const navigation = useNavigation();

  const { signOut } = useClerk();

  const handleLock = async () => {
    // removeItem("affiliate");
    // removeItem("firstname");
    // removeItem("store_name");
    // removeItem("affiliate_id");
    // removeItem("admin_id");
    // removeItem("admin");
    // await signOut();
    // @ts-ignore
    navigation.navigate("Unlock");
  };

  function OnPress(title: string) {
    console.info("Pressed", title);
    // @ts-ignore
    navigation.navigate(title);
  }

  return (
    <View
      style={{
        backgroundColor: Colors.darkGrey,
        flex: 1,
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 8,
      }}
    >
      <View className="flex-1">
        <View className="px-2">
          <Text className="text-2xl text-gray-50 font-medium ">
            {store_name}
          </Text>
        </View>
        <ScrollView>
          <View className={styles.quickLinksContainer}>
            {affiliateLinksArray.map((qlink) => (
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
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleLock} className={styles.button}>
        <Text className="text-2xl font-medium">Lock</Text>
      </TouchableOpacity>
    </View>
  );
};

const AdminLinks = () => {
  const firstname = getItem("firstname");

  const _id = "RDy0NRgK4s4Oz2Kxq9tuZw";

  const navigation = useNavigation();

  function OnPress(title: string) {
    console.info("Pressed", title);
    // @ts-ignore
    navigation.navigate(title);
  }

  const { signOut } = useClerk();

  const handleLock = async () => {
    // removeItem("affiliate");
    // removeItem("firstname");
    // removeItem("store_name");
    // removeItem("affiliate_id");
    // removeItem("admin_id");
    // removeItem("admin");
    // await signOut();
    // @ts-ignore
    navigation.navigate("Unlock");
  };

  return (
    <View
      style={{
        backgroundColor: Colors.darkGrey,
        flex: 1,
        paddingTop: 8,
        paddingBottom: 24,
      }}
    >
      <View className="flex-1">
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
              title={"Preview Store"}
              icon={"eye"}
              onPress={() =>
                // @ts-ignore
                navigation.navigate("PreviewStore", {
                  _id,
                })
              }
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
  const { isAffiliate } = route.params ?? {};

  if (isAffiliate) {
    return <AffiliateLinks />;
  }

  return <AdminLinks />;
};

const styles = {
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg m-2",
  quickLinksContainer:
    " flex-wrap  flex-row justify-between  px-4 py-2 border border-white/40 rounded-md  mt-4 ",
};
