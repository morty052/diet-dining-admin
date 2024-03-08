import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function GenerateOtpScreen() {
  const [OTP, setOTP] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getOTP(admin_id: string) {
    // console.info("this is id", admin_id);
    // console.log("jjj");
    try {
      setLoading(true);
      const res = await fetch(
        // `http://192.168.100.16:3000/admin/get-otp?admin_id=${admin_id}`
        // `http://localhost:3000/admin/get-otp?admin_id=${admin_id}`
        `https://diet-dining-server.onrender.com/admin/get-otp?admin_id=${admin_id}`
      );
      const data = await res.json();
      const { otp } = data;
      setOTP(otp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View className={styles.container}>
      <View className="flex-1 justify-center flex pb-20">
        {OTP && (
          <>
            <Text className="text-center text-gray-50 text-[20px] font-medium mb-4">
              Use the code below to verify login on the webapp
            </Text>
            <Text className="text-5xl text-gray-50 tracking-widest text-center">
              {OTP}
            </Text>
          </>
        )}
        {!OTP && !loading && (
          <View>
            <View className="flex flex-row justify-center py-4">
              <Ionicons size={80} color={"white"} name="lock-closed-outline" />
            </View>
            <Text className="text-center text-3xl text-gray-50 font-semibold mb-4">
              Verify Admin Login
            </Text>
            <Text className="text-center text-[20px] text-gray-50 font-medium mb-4">
              Click the button below to generate a one time password for your
              admin panel
            </Text>
          </View>
        )}
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color={"white"} />
          </View>
        )}
      </View>
      <View className="gap-4">
        <TouchableOpacity
          onPress={() => getOTP("4118a74d-0b15-4f81-8cab-135e035cc395")}
          className={styles.button}
        >
          <Text className="text-3xl">Generate OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: "flex-1 bg-gray-800 py-16 px-4 justify-between",
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
};
