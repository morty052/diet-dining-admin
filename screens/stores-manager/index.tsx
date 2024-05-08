import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Switch,
} from "react-native";
import React from "react";
import { Screen } from "../../components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { baseUrl } from "../../constants/baseUrl";
import LoadingScreen from "../../components/ui/LoadingScreen";
import BackButton from "../../components/ui/BackButton";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";

const Tabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type Props = {};

type TstoreProps = {
  store_name: string;
  store_image: string;
  store_logo: string;
  store_address: {
    street: string;
    city: string;
    province: string;
    postal_code: number;
  };
  store_description: string;
  store_status: any;
};

const StoreCard = ({ store }: { store: TstoreProps }) => {
  const navigate = useNavigation();
  return (
    <Pressable
      onPress={() =>
        // @ts-ignore
        navigate.navigate("store", {
          store,
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
          <Text className=" text-[18px] font-medium text-gray-800">
            {store?.store_address?.street
              ? store.store_address.street
              : "Not provided"}
          </Text>
        </View>
        {/* <View className="">
      <Text className="text-[18px]">
        {store.store_description} stakes and pies
      </Text>
    </View> */}
      </View>
    </Pressable>
  );
};

function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: Colors.light }}>{title}</Text>
      <Text style={{ fontSize: 18, color: Colors.light }}>{value}</Text>
    </View>
  );
}

function ConfirmationModal({
  isOpen,
  setIsOpen,
  handleCancel,
  handleConfirm,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  handleConfirm: () => void;
}) {
  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "flex-end",
          paddingHorizontal: 5,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            height: 250,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 50,
            gap: 20,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: SEMI_BOLD,
                textAlign: "center",
              }}
            >
              Verify Store ?
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: SEMI_BOLD,
                textAlign: "center",
              }}
            >
              Store will become visible to customers and drivers and be able to
              take orders.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", paddingHorizontal: 10, gap: 10 }}
          >
            <Pressable
              onPress={handleCancel}
              style={{
                flex: 1,
                backgroundColor: Colors.danger,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              style={{
                flex: 1,
                backgroundColor: Colors.primary,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const AllStoresView = () => {
  const navigate = useNavigation();

  async function get_stores() {
    const res = await fetch(`${baseUrl}/stores/get-verified-stores`);
    const data = await res.json();
    return data;
  }

  const { data: stores, isLoading } = useQuery({
    queryKey: ["verified_stores"],
    queryFn: get_stores,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Verified Stores</Text>
      <View style={styles.inputContainer}>
        <Ionicons size={24} color={"white"} name="search-outline" />
        <TextInput
          style={styles.input}
          placeholderTextColor={"white"}
          placeholder="Search Verified Stores"
        />
      </View>
      <ScrollView>
        <View>
          {stores?.map((store: TstoreProps) => (
            <StoreCard key={store.store_name} store={store} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const OnboardingStoresView = () => {
  const navigate = useNavigation();

  async function get_unverified_stores() {
    const res = await fetch(`${baseUrl}/stores/get-unverified-stores`);
    const data = await res.json();
    const { stores } = data;
    return stores;
  }

  const { data: stores, isLoading } = useQuery({
    queryKey: ["unverified_stores"],
    queryFn: get_unverified_stores,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Onboarding Stores</Text>
      <View style={styles.inputContainer}>
        <Ionicons size={24} color={"white"} name="search-outline" />
        <TextInput
          style={styles.input}
          placeholderTextColor={"white"}
          placeholder="Search Onboarding Stores"
        />
      </View>
      <ScrollView>
        <View>
          {stores?.map((store: TstoreProps) => (
            <StoreCard key={store.store_name} store={store} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const StoreView = ({ route }: any) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isVerified, setisVerified] = React.useState(false);
  const { store } = route.params;
  const { store_name, store_image, store_description, _id, verified } =
    store ?? {};

  const toggleComplete = (value: boolean) => {
    setisVerified((previousState) => !previousState);
    if (value) {
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setisVerified(false);
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    const res = await fetch(`${baseUrl}/admin/verify-store?store_id=${_id}`);
    const data = await res.json();
    setisVerified(true);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={{ height: 300, width: "100%" }}
        source={{ uri: store_image }}
      />
      <ListItem title="Name" value={store_name} />
      <ListItem
        title="Address"
        value={
          store?.store_address?.street
            ? store?.store_address?.street
            : "Not provided"
        }
      />
      <ListItem title="Email" value={"Hardcoded@mail.com"} />
      <ListItem title="Phone" value={"+1234566789"} />
      <ListItem title="Status" value={verified ? "Verified" : "Not Verified"} />
      {!verified && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontFamily: SEMI_BOLD,
              fontSize: 20,
            }}
          >
            Verify Store
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={isVerified ? "white" : "#f4f3f4"}
            //   ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleComplete(value)}
            value={isVerified}
          />
        </View>
      )}
      <ConfirmationModal
        handleConfirm={handleConfirm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleCancel={handleCancel}
      />
    </View>
  );
};

const StoreTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.darkGrey },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="checkmark-circle-outline"
              size={24}
              color={!focused ? "white" : Colors.primary}
            />
          ),
        }}
        name="Verified"
        component={AllStoresView}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="hourglass-outline"
              size={24}
              color={!focused ? "white" : Colors.primary}
            />
          ),
        }}
        name="Onboarding"
        component={OnboardingStoresView}
      />
    </Tabs.Navigator>
  );
};

export const StoresManager = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: "center",
        title: "",
        headerTitleStyle: { color: "white" },
        headerStyle: {
          backgroundColor: Colors.darkGrey,
        },
      }}
    >
      <Stack.Screen name="AllStores" component={StoreTabs} />
      <Stack.Screen name="store" component={StoreView} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 10,
    gap: 10,
  },
  titleText: {
    color: Colors.light,
    fontSize: 24,
    fontFamily: SEMI_BOLD,
  },
  // border border-white px-2 py-1 my-2  rounded-lg flex items-center flex-row
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 10,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightBlack,
  },
  input: {
    flex: 1,
    padding: 4,
    color: Colors.light,
  },
});
