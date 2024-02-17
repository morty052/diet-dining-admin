import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function LoginPage() {
  const navigation = useNavigation();

  return (
    <View className={styles.container}>
      <Text className="text-xl">Login to Admin Account</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("QuickLinks")}
        className={styles.button}
      >
        <Text className="text-3xl">Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  container: "flex-1 bg-red-100 py-16 px-4 justify-between",
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
};
