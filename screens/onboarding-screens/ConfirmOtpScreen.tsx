import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useSignIn } from "@clerk/clerk-expo";
import { useSignUp } from "@clerk/clerk-expo";
import { getValueFor, save } from "../../utils/secureStore";
import { removeItem, setItem } from "../../utils/storage";
import { baseUrl } from "../../constants/baseUrl";

export function ConfirmOtpScreen({ route, navigation }: any) {
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempting, setAttempting] = useState(false);
  const [error, setError] = useState("");

  const { emailAddress, isRegister } = route.params;

  const { isLoaded, signIn, setActive } = useSignIn();

  const { signUp } = useSignUp();

  async function handleVerify() {
    const isAdmin = emailAddress.includes("@dietdining.org");
    console.info("isAdmin", isAdmin);
    if (loading) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    if (!OTP) {
      return;
    }
    setLoading(true);

    if (isRegister) {
      await signUp?.attemptEmailAddressVerification({
        code: OTP,
      });
    }

    if (!isRegister) {
      await signIn.attemptFirstFactor({
        strategy: "email_code",
        code: OTP,
      });
    }

    try {
      const expo_push_token = await getValueFor("expo_push_token");
      const email = emailAddress.trim();
      const url = `${baseUrl}/admin/register-companion?admin_email=${email}&expo_push_token=${expo_push_token}`;
      // const url = `http://localhost:3000/admin/register-companion?admin_email=${emailAddress}&expo_push_token=${expo_push_token}`;
      const res = await fetch(url);
      const data = await res.json();
      const { _id, firstname, status, admin_avatar } = data;
      console.log(data);
      if (status == "CONFIRMED") {
        setItem("admin_id", _id);
        setItem("firstname", firstname);
        setItem("admin_avatar", admin_avatar);
        setItem("ONBOARDED", "TRUE");
        setItem("admin", "TRUE");
        setLoading(false);
        setOTP("");
        // * REMOVE THE SIGNED OUT ITEM THAT TRIGGERS NAVIGATION BACK TO LOGIN SCREEN
        removeItem("SignedOut");
        return navigation.navigate("Unlock");
      }

      if (status == "REJECTED") {
        console.log(status);
        setLoading(false);
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View className="justify-center flex pb-20">
          {!attempting && (
            <View>
              <View className="flex flex-row justify-center py-4">
                <Ionicons
                  size={80}
                  color={"white"}
                  name="lock-closed-outline"
                />
              </View>
              <Text className="text-center text-3xl text-gray-50 font-semibold mb-4">
                Verify Email
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
      </KeyboardAvoidingView>
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
    backgroundColor: Colors.darkGrey,
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
