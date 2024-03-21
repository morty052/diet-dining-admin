import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screen } from "../../../components/screen";
import { View, Text, Image, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import { useQuery } from "@tanstack/react-query";
import OrderCard, { TorderProps } from "../components/OrderCard";
import { baseUrl } from "../../../constants/baseUrl";
import { getItem } from "../../../utils/storage";
import AffiliateOrderCard, {
  TAffiliateOrderProps,
} from "../components/AffiliateOrderCard";
import Colors from "../../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const AllOrdersView = () => {
  const get_afiiliate_orders = async () => {
    const affilate_id = getItem("affiliate_id");
    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate-orders?afilliate_id=${affilate_id}`
    );
    const data = await res.json();
    if (!data) {
      return [];
    }
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ["orders"], queryFn: get_afiiliate_orders });

  return (
    <View style={{ backgroundColor: Colors.darkGrey, flex: 1 }}>
      <SearchBar />
      {orders?.map((order: TAffiliateOrderProps, index: number) => (
        <AffiliateOrderCard
          _id={order._id}
          status={order.status}
          key={index}
          location={order.location}
          total={order.total}
          products={order.products}
          image={order.products?.[0]?.image}
        />
      ))}
      {!isLoading && orders?.length === 0 && (
        <Text className="text-center text-gray-50 text-lg my-4 font-medium">
          No Orders Found
        </Text>
      )}
      {isLoading && <ActivityIndicator size={50} color={"white"} />}

      <Text
        onPress={() => refetch()}
        className="text-center text-gray-50 text-lg my-4 font-medium"
      >
        Pull Down to refresh
      </Text>
    </View>
  );
};

export const AffiliateOrdersStack = () => {
  return (
    <Screen>
      <View className="flex  flex-row justify-between mb-4 max-h-12">
        <FilterButton title="All" />
        <FilterButton title="Pending" />
        <FilterButton title="Completed" />
        <FilterButton title="Cancelled" />
      </View>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="All" component={AllOrdersView} />
      </Stack.Navigator>
    </Screen>
  );
};
