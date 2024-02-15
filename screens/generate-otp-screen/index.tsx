import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function GenerateOtpScreen() {
  const [OTP, setOTP] = useState(null);

  async function getOTP(admin_id: string) {
    // console.info("this is id", admin_id);
    // console.log("jjj");
    try {
      const res = await fetch(
        `http://localhost:3000/admin/get-otp?admin_id=${admin_id}`
      );
      const data = await res.json();
      const { otp } = data;
      setOTP(otp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className={styles.container}>
      <View className="flex-1 justify-center flex pb-20">
        {OTP && (
          <>
            <Text className="text-center text-[16px] mb-4">
              Use the code below to verify login on the webapp
            </Text>
            <Text className="text-5xl text-center">{OTP}</Text>
          </>
        )}
        {!OTP && (
          <Text className="text-center text-[18px] font-medium mb-4">
            Click the button below to generate a one time password for your
            admin panel
          </Text>
        )}
      </View>
      <View className="gap-4">
        <TouchableOpacity
          onPress={() => getOTP("4118a74d-0b15-4f81-8cab-135e035cc395")}
          className={styles.button}
        >
          <Text className="text-3xl">Generate OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity className={styles.button}>
          <Text className="text-3xl">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: "flex-1 bg-red-100 py-16 px-4 justify-between",
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
};
