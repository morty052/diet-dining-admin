import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Screen } from "../../components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "../../utils/storage";
import { SEMI_BOLD } from "../../constants/fontNames";

const Tabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type Props = {};

type TstoreProps = {
  store_name: string;
  store_image: string;
  store_logo: string;
  store_address: string;
  store_description: string;
  store_status: any;
};

const AllStoresView = () => {
  const navigate = useNavigation();

  async function get_stores() {
    const res = await fetch("http://localhost:3000/stores/get-all");
    const data = await res.json();
    console.info(data);
    return data;
  }

  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: get_stores,
  });

  return (
    <Screen>
      <Text className="text-gray-50 text-2xl font-medium">All Stores</Text>
      <View className="border border-white px-2 py-1 my-2  rounded-lg flex items-center flex-row">
        <Ionicons size={24} color={"white"} name="search-outline" />
        <TextInput
          placeholderTextColor={"white"}
          placeholder="Search All Stores"
          className="w-full p-2 text-white"
        />
      </View>
      <View>
        {stores?.map((store: TstoreProps) => (
          <TouchableOpacity
            onPress={() =>
              // @ts-ignore
              navigate.navigate("store", {
                _id: store.store_name,
              })
            }
            className="bg-white p-2 mt-4 flex items-center flex-row rounded-lg"
            key={store.store_name}
          >
            <Image
              source={{ uri: store.store_logo }}
              className="h-20 w-20 rounded-md"
            />
            <View className="flex-1 ml-4">
              <View className="flex flex-row items-center gap-1 py-1">
                {/* <Ionicons size={20} name="storefront-outline" /> */}
                <Text className="text-[20px] ml-1 font-semibold text-gray-800">
                  {store.store_name}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-1 py-1">
                <Ionicons size={20} name="location-outline" />
                <Text className=" text-[18px] font-medium text-gray-800">
                  {store.store_address}
                </Text>
              </View>
              {/* <View className="">
                <Text className="text-[18px]">
                  {store.store_description} stakes and pies
                </Text>
              </View> */}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

const OnboardingStoresView = (props: Props) => {
  return (
    <Screen>
      <Text>Store manager</Text>
    </Screen>
  );
};

const StoreView = ({ route }: { route: any }) => {
  const { _id } = route.params;
  return (
    <Screen>
      <Text>{_id}</Text>
    </Screen>
  );
};

export const AffiliateStoreManager = ({ navigation }: any) => {
  const store_name = getItem("store_name");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: store_name,
      headerTitleAlign: "center",
      headerTitleStyle: { color: "white", fontSize: 17, fontFamily: SEMI_BOLD },
    });
  }, []);

  return (
    <Screen>
      <Text>{"_id"}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({});
