import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Auth from "expo-local-authentication";
import { LocalAuthenticationOptions } from "expo-local-authentication";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

const PassCodeScreen = ({ navigation }) => {
  const [unlocked, setUnlocked] = React.useState(false);

  // React.useEffect(() => {
  //   const authenticate = async () => {
  //     const res = await Auth.authenticateAsync({
  //       promptMessage: "Authenticate to continue",
  //     });
  //     if (res.success) {
  //       setUnlocked(true);
  //       navigation.navigate("QuickLinks");
  //     }

  //     console.log(res);
  //   };

  //   authenticate();
  // }, []);

  async function retry() {
    const res = await Auth.authenticateAsync({
      promptMessage: "Authenticate to continue",
    });
    if (res.success) {
      setUnlocked(true);
      navigation.navigate("QuickLinks");
    }

    console.log(res);
  }

  if (!unlocked) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
        <View
          style={{
            paddingBottom: 150,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            paddingHorizontal: 20,
          }}
        >
          <MaterialIcons
            onPress={retry}
            name="fingerprint"
            size={150}
            color={Colors.primary}
          />
          <Text
            style={{ color: "white", fontSize: 24, fontFamily: SEMI_BOLD }}
            onPress={retry}
          >
            Verify to continue
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: SEMI_BOLD,
              textAlign: "center",
            }}
            onPress={retry}
          >
            Tap the icon to unlock with passcode or Face ID
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text onPress={retry}>PassCodeScreen</Text>
      <Button onPress={retry} title="Retry" />
    </SafeAreaView>
  );
};

export default PassCodeScreen;

const styles = StyleSheet.create({});
