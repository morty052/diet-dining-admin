import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TaskTypeInfoSheet } from "../project-manager/components/TaskBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { SEMI_BOLD } from "../../constants/fontNames";
import { ControlButtons } from "../../components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextInput } from "react-native-gesture-handler";
import { useNewTask } from "../../models/newTask";
import { TaskItemProps } from "../../types/TaskItemProps";

const Stack = createNativeStackNavigator();

type Props = {};

const taskTypesArray = [
  {
    title: "Event",
    value: "EVENT",
  },
  {
    title: "Poll",
    value: "POLL",
  },
  {
    title: "Action",
    value: "ACTION",
  },
  {
    title: "Review",
    value: "REVIEW",
  },
];

function TaskTypeCard({
  title,
  onSelect,
  value,
  onPressInfo,
}: {
  title: string;
  value: string;
  onSelect: (value: string) => void;
  onPressInfo: (value: string) => void;
}) {
  return (
    <Pressable
      style={{
        borderWidth: 1,
        borderColor: Colors.muted,
        padding: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: Colors.light, fontSize: 20 }}>{title}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Ionicons
          onPress={() => onPressInfo(value)}
          name="help-circle"
          size={32}
          color={Colors.muted}
        />
        <Ionicons
          onPress={() => onSelect(value)}
          name="checkmark-circle"
          size={30}
          color={Colors.muted}
        />
      </View>
    </Pressable>
  );
}

function AddSuggestions({
  suggestion,
  setSuggestion,
  suggestionArray,
  setSuggestionArray,
}: {
  suggestion: string;
  setSuggestion: React.Dispatch<React.SetStateAction<string>>;
  suggestionArray: string[];
  setSuggestionArray: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const addToArray = (text: string) => {
    setSuggestion("");
    setSuggestionArray((prev) => [...prev, text]);
  };

  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          fontFamily: SEMI_BOLD,
          fontWeight: "bold",
          color: Colors.light,
          fontSize: 20,
        }}
      >
        Suggestions
      </Text>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <TextInput
          value={suggestion}
          onChangeText={(text) => setSuggestion(text)}
          style={styles.input}
        />
        <Pressable
          onPress={() => addToArray(suggestion)}
          style={{
            height: 50,
            width: 50,
            borderRadius: 10,
            backgroundColor: Colors.lightBlack,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="add-circle" color={Colors.primary} size={30} />
        </Pressable>
      </View>
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
        {suggestionArray?.map((suggestion: string) => {
          return (
            <View key={suggestion}>
              <Text style={{ color: Colors.light, fontSize: 18 }}>
                {suggestion}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function SelectedTypePreview({
  type,
  setTaskType,
}: {
  type: string;
  setTaskType: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colors.lightBlack,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          color: Colors.light,
          fontSize: 30,
          textTransform: "capitalize",
        }}
      >
        {type}
      </Text>
      <Ionicons
        onPress={() => setTaskType("")}
        name="close-circle"
        size={30}
        color={Colors.danger}
      />
    </View>
  );
}

// TODO:FIX BUG THAT SELECTS TYPE WHEN YOU CLICK ON INFO
const TaskTypeScreen = ({ navigation }: any) => {
  const [taskType, setTaskType] = React.useState<
    Partial<TaskItemProps["type"]> | string
  >("");
  const [suggestion, setSuggestion] = React.useState("");
  const [suggestionArray, setSuggestionArray] = React.useState<string[]>([]);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const { setType, setSuggestions } = useNewTask();

  const handleSelect = (value: string) => {
    setTaskType(value);
  };

  const handlePressInfo = (value: string) => {
    setTaskType(value);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const handleContinue = () => {
    setType(taskType as Partial<TaskItemProps["type"]>);
    if (taskType == "POLL" && suggestionArray.length > 0) {
      setSuggestions(suggestionArray);
    }
    navigation.navigate("TaskMembers");
  };

  return (
    <View style={styles.container}>
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
            Select task type
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
            }}
          >
            Select an appropriate type for your task.
          </Text>
        </View>
        {!taskType && (
          <View
            style={{
              backgroundColor: Colors.lightBlack,
              gap: 20,
              paddingBottom: 20,
              paddingHorizontal: 10,
              paddingTop: 10,
              borderRadius: 10,
            }}
          >
            {taskTypesArray.map(({ title, value }) => (
              <TaskTypeCard
                onPressInfo={(value) => handlePressInfo(value)}
                key={title}
                title={title}
                value={value}
                onSelect={(value) => handleSelect(value)}
              />
            ))}
          </View>
        )}
        {taskType && (
          <SelectedTypePreview setTaskType={setTaskType} type={taskType} />
        )}
        {taskType && taskType == "POLL" && (
          <AddSuggestions
            setSuggestion={setSuggestion}
            suggestion={suggestion}
            setSuggestionArray={setSuggestionArray}
            suggestionArray={suggestionArray}
          />
        )}
      </View>
      <ControlButtons handlePress={handleContinue} />
      <TaskTypeInfoSheet taskType={taskType} bottomSheetRef={bottomSheetRef} />
    </View>
  );
};

export default TaskTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: Colors.darkGrey,
    gap: 20,
    justifyContent: "space-between",
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 10,
    color: Colors.light,
    fontSize: 16,
    backgroundColor: Colors.lightBlack,
    height: 50,
    flex: 1,
  },
});
