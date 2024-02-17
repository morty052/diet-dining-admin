import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function LoginPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className={styles.container}>
      <View className="">
        <Text className="text-3xl text-white font-medium">
          Login to Admin Account
        </Text>
        <Text className="  text-lg text-white font-medium">
          Please enter your admin email and password to continue
        </Text>
        <TextInput
          placeholderTextColor={"white"}
          className="border border-gray-50 rounded-md mt-6 p-2"
          placeholder="Admin Email"
        />
        <TextInput
          placeholderTextColor={"white"}
          className="border border-gray-50 rounded-md mt-6 p-2"
          placeholder="Admin Password"
        />
      </View>
      <TouchableOpacity
        // @ts-ignore
        onPress={() => navigation.navigate("QuickLinks")}
        className={styles.button}
      >
        <Text className="text-3xl">Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: "flex-1 bg-gray-800 py-10 px-4 justify-between",
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
};
