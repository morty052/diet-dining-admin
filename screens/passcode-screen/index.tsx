import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Auth from "expo-local-authentication";
import { LocalAuthenticationOptions } from "expo-local-authentication";

type Props = {};

const PassCodeScreen = ({ navigation }) => {
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    const authenticate = async () => {
      const res = await Auth.authenticateAsync({
        promptMessage: "Authenticate to continue",
      });
      if (res.success) {
        setUnlocked(true);
        navigation.navigate("QuickLinks");
      }

      console.log(res);
    };

    authenticate();
  }, []);

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
      <SafeAreaView>
        <Text onPress={retry}>Unlock</Text>
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
