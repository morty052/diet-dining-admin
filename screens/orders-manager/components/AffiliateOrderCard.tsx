import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";

export type TAffiliateOrderProps = {
  location?: string;
  _id: string;
  total: number;
  status: {
    pending: boolean;
    completed: boolean;
    cancelled: boolean;
  };
  products: {
    quantity: number;
    image: string;
    name: string;
    price: number;
  }[];
  image: string;
};

const AffiliateOrderCard = ({
  location,
  total,
  status,
  image,
  _id,
  products,
}: TAffiliateOrderProps) => {
  const navigate = useNavigation();
  const OrderStatus = ({
    status,
  }: {
    status: {
      pending: boolean;
      completed: boolean;
      cancelled: boolean;
    };
  }) => {
    const { pending, cancelled, completed } = status;
    let state = "";
    switch (true) {
      case pending:
        state = "Pending";
        break;
      case cancelled:
        state = "Cancelled";
        break;
      case completed:
        state = "Completed";
        break;
      default:
        break;
    }

    return (
      <View className="absolute top-2 right-2">
        <View className="">
          <Text>{state}</Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        // @ts-ignore
        navigate.navigate("Order", {
          order_id: _id,
          products,
          total,
          status,
        })
      }
      className="border mb-4 relative flex flex-row border-white bg-gray-50 rounded-lg p-2"
    >
      <Image className="h-20 w-20" source={{ uri: image }} />
      <View className="pl-2 space-y-1">
        {/* <Text className="font-medium">{vendor}</Text> */}
        <Text className="font-medium">Pending</Text>
        <Text>{location}</Text>
        <Text className="text-xl font-semibold">${total}</Text>
      </View>
      <OrderStatus status={status} />
    </TouchableOpacity>
  );
};

export default AffiliateOrderCard;
