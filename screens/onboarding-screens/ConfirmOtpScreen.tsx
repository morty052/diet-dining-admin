import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useSignIn } from "@clerk/clerk-expo";
import { getValueFor, save } from "../../utils/secureStore";

export function ConfirmOtpScreen({ route, navigation }: any) {
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempting, setAttempting] = useState(false);

  const { emailAddress } = route.params;

  const { isLoaded, signIn, setActive } = useSignIn();

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

  async function handlPress() {
    if (!isLoaded) {
      return;
    }

    try {
      // await signIn?.prepareFirstFactor({
      //   strategy: "email_code",

      await signIn.create({
        strategy: "email_code",
        identifier: emailAddress,
      });
      setAttempting(true);
    } catch (error) {
      console.error({ error });
    }
  }

  async function handleVerify() {
    if (loading) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    setLoading(true);
    try {
      await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: OTP,
      });

      const expo_push_token = await getValueFor("expo_push_token");

      const url = `https://8b52-102-216-10-2.ngrok-free.app/affiliates/register-companion?affiliate_email=${emailAddress}&expo_push_token=${expo_push_token}`;
      const res = await fetch(url);
      const data = await res.json();
      const { _id } = data;
      await save("affiliate_id", _id);
      await save("ONBOARDED", "TRUE");
      navigation.navigate("QuickLinks");

      console.log("verified");
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <View style={styles.container}>
      <View className="flex-1 justify-center flex pb-20">
        {!attempting && (
          <View>
            <View className="flex flex-row justify-center py-4">
              <Ionicons size={80} color={"white"} name="lock-closed-outline" />
            </View>
            <Text className="text-center text-3xl text-gray-50 font-semibold mb-4">
              Verify Affiliate Email
            </Text>
            <Text className="text-center text-[15px] text-gray-50 font-medium mb-4">
              Enter the code we sent to your email below.
            </Text>
            <TextInput
              value={OTP}
              autoFocus
              keyboardType="number-pad"
              onChangeText={(text) => setOTP(text)}
              placeholderTextColor={"white"}
              placeholder="One Time Code"
              style={styles.input}
            />
          </View>
        )}
      </View>
      <View className="gap-4">
        <TouchableOpacity
          // onPress={() => getOTP("4118a74d-0b15-4f81-8cab-135e035cc395")}
          onPress={() => handleVerify()}
          style={styles.button}
        >
          {!loading ? (
            <Text className="text-3xl">Confirm</Text>
          ) : (
            <ActivityIndicator size={40} color={"black"} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// const styles = {
//   container: "flex-1 bg-gray-800 py-16 px-4 justify-between",
//   button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 20,
    justifyContent: "space-between",
    backgroundColor: Colors.dark,
  },
  button: {
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "white",
    textAlign: "center",
  },
});
