import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useMemo } from "react";
import { Screen } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import OrderCard, { TorderProps } from "./components/OrderCard";

const Stack = createNativeStackNavigator();

type Props = {};

const FilterButton = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  // const screenTitle = useNavigation().getId();

  // console.log(screenTitle);

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate(title)}
      className="text-gray-50  border border-white flex items-center justify-center  py-1 rounded-xl w-24 h-8 "
    >
      <Text className="text-white  font-medium text-center">{title}</Text>
    </TouchableOpacity>
  );
};

const SearchBar = () => {
  return (
    <View className="border border-white px-2 py-1 mb-4  rounded-lg flex items-center flex-row">
      <Ionicons size={24} color={"white"} name="search-outline" />
      <TextInput
        placeholderTextColor={"white"}
        placeholder="Search All Orders"
        className="w-full p-2 text-white"
      />
    </View>
  );
};

const AllOrdersView = () => {
  const get_all_orders = async () => {
    const res = await fetch(
      "https://diet-dining-server.onrender.com/orders/get-all"
    );
    // const res = await fetch("http://localhost:3000/orders/get-all");
    const data = await res.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["orders"], queryFn: get_all_orders });

  return (
    <View className="bg-gray-800 flex-1">
      {orders?.map((order: TorderProps, index: number) => (
        <OrderCard
          status={order.status}
          key={index}
          vendor={order.vendor}
          location={order.location}
          total={order.total}
          vendor_logo={order.vendor_logo}
        />
      ))}
      <Text className="text-center text-gray-50 text-lg my-4 font-medium">
        Pull Down to refresh
      </Text>
    </View>
  );
};

const PendingOrdersView = () => {
  const get_all_orders = async () => {
    const res = await fetch(
      "https://diet-dining-server.onrender.com/orders/get-all"
    );
    // const res = await fetch("http://localhost:3000/orders/get-all");
    const data = await res.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["orders"], queryFn: get_all_orders });

  return (
    <View className="bg-gray-800 flex-1">
      {orders?.map((order: TorderProps, index: number) => (
        <OrderCard
          status={order.status}
          key={index}
          vendor={order.vendor}
          location={order.location}
          total={order.total}
          vendor_logo={order.vendor_logo}
        />
      ))}
      <Text className="text-center text-gray-50 text-lg my-4 font-medium">
        Pull Down to refresh
      </Text>
    </View>
  );
};

export const OrdersManager = (props: Props) => {
  return (
    <Screen>
      <View className="flex flex-row justify-between mb-4 max-h-12">
        <FilterButton title="All" />
        <FilterButton title="Pending" />
        <FilterButton title="Completed" />
        <FilterButton title="Cancelled" />
      </View>
      <SearchBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="All" component={AllOrdersView} />
        <Stack.Screen name="Pending" component={PendingOrdersView} />
        <Stack.Screen name="Completed" component={PendingOrdersView} />
        <Stack.Screen name="Cancelled" component={PendingOrdersView} />
      </Stack.Navigator>
    </Screen>
  );
};
