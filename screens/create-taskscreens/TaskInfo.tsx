import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { TaskTypeInfoSheet } from "../project-manager/components/TaskBottomSheet";
import { Ionicons } from "@expo/vector-icons";
import { ControlButtons } from "../../components";
import { useNewTask } from "../../models/newTask";

function TaskInfo({ navigation }: any) {
  const [taskName, setTaskName] = React.useState("");
  const [taskDescription, setTaskDescription] = React.useState("");
  const [error, setError] = React.useState("");

  const { setName, setDescription } = useNewTask();

  const handlePress = () => {
    if (!taskName || !taskDescription) {
      setError("Please fill both fields");
      return;
    }

    setName(taskName);
    setDescription(taskDescription);
    navigation.navigate("TaskType");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: "padding", android: "height" })}
      style={styles.container}
    >
      <View style={{ gap: 20 }}>
        <View>
          <Text
            style={{
              fontFamily: SEMI_BOLD,
              fontWeight: "bold",
              color: Colors.light,
              fontSize: 24,
            }}
          >
            Add new task info
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
            }}
          >
            Enter name and description of task (can be updated later)
          </Text>
        </View>
        <TextInput
          value={taskName}
          onChangeText={(text) => setTaskName(text)}
          autoFocus
          placeholderTextColor={Colors.muted}
          placeholder="Task Name"
          style={styles.input}
        />
        <TextInput
          value={taskDescription}
          onChangeText={(text) => setTaskDescription(text)}
          multiline
          placeholderTextColor={Colors.muted}
          placeholder="Task Description"
          style={[
            styles.input,
            { height: 90, textAlignVertical: "top", padding: 10 },
          ]}
        />
      </View>
      <ControlButtons handlePress={handlePress} />
    </KeyboardAvoidingView>
  );
}

export default TaskInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: Colors.darkGrey,
    gap: 20,
    justifyContent: "space-between",
  },
  box: {
    height: 200,
    width: 200,
    backgroundColor: "purple",
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
