import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

const TaskCreated = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingBottom: 200,
          paddingHorizontal: 20,
        }}
      >
        <View>
          <Text style={styles.headerText}>Task Created!</Text>
          <Text style={styles.subtitle}>Task has been added to project</Text>
        </View>
        <Pressable
          style={{
            backgroundColor: Colors.primary,
            width: "100%",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("TaskInfo")}
        >
          <Text style={styles.headerText}>Create Another</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Projects")}>
          <Text style={styles.viewProjectText}>View Projects</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TaskCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: Colors.darkGrey,
    gap: 20,
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: SEMI_BOLD,
    fontWeight: "bold",
    color: Colors.light,
    fontSize: 24,
    textAlign: "center",
  },
  viewProjectText: {
    fontFamily: SEMI_BOLD,
    fontWeight: "bold",
    color: Colors.muted,
    fontSize: 24,
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "normal",
    color: Colors.light,
    fontSize: 16,
    textAlign: "center",
  },
  attachmentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightBlack,
  },
  attachmentButtonText: {
    color: Colors.light,
    fontFamily: SEMI_BOLD,
    fontSize: 20,
    textTransform: "capitalize",
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.light,
    fontSize: 16,
    backgroundColor: Colors.lightBlack,
    height: 60,
  },
});
