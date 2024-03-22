import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Screen } from "../../components";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

export const NotificationsManager = (props: Props) => {
  return (
    <Screen>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 200,
        }}
      >
        <Text style={{ fontSize: 30, fontFamily: SEMI_BOLD, color: "white" }}>
          UNDER
        </Text>
        <Text style={{ fontSize: 30, fontFamily: SEMI_BOLD, color: "white" }}>
          DEVELOPMENT
        </Text>
        <Text style={{ fontSize: 70 }}>🛠️</Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});
