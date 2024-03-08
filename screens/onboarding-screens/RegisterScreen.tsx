import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";
import { useSignIn } from "@clerk/clerk-expo";

type Props = {};

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  async function handleNext() {
    if (!email || !password) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      await signIn.create({
        strategy: "email_code",
        identifier: email,
      });
      navigation.navigate("OtpScreen", {
        emailAddress: email,
      });
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.dark }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View>
              <Text
                style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 28 }}
              >
                Welcome to diet dining
              </Text>
              <Text
                style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 14 }}
              >
                Get started with your companion setup by providing the details
                below.
              </Text>
            </View>
            <View style={{ gap: 6 }}>
              <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>
                Enter the email linked to your store
              </Text>
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                placeholderTextColor={"white"}
                placeholder="Registered email"
              />
            </View>
            <View style={{ gap: 6 }}>
              <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>
                Enter account password
              </Text>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
                placeholderTextColor={"white"}
                placeholder="Password"
              />
            </View>
          </View>

          <Pressable onPress={handleNext} style={styles.button}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 20,
    justifyContent: "space-between",
  },
  innerContainer: {
    gap: 20,
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
  },
});
