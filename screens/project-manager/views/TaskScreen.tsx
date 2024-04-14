import {
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import ReminderButton from "../components/ReminderButton";
import AttachmentButtons from "../components/AttachmentButtons";
import MemberButtons from "../components/MemberButtons";
import SuggestionsGrid from "../components/SuggestionsGrid";
import { TaskItemProps } from "../../../types/TaskItemProps";
import ReviewSection from "../components/ReviewSection";

type Props = {};

const TaskScreen = ({ route }: any) => {
  const [isStarted, setIsStarted] = React.useState(false);
  const [isCompleted, setisCompleted] = React.useState(false);

  const toggleStarted = () => setIsStarted((previousState) => !previousState);
  const toggleComplete = () =>
    setisCompleted((previousState) => !previousState);

  const { task } = route.params;
  const {
    name,
    type,
    completed,
    description,
    members,
    attachments,
  }: TaskItemProps = task ?? {};

  console.info(members);

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.container}
      style={styles.container}
    >
      <Text style={styles.headerText}>{name}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
      <MemberButtons members={members} />
      <AttachmentButtons attachments={attachments} />
      {type == "POLL" && <SuggestionsGrid />}
      {type == "REVIEW" && <ReviewSection />}
      <View style={{ gap: 20, paddingTop: 10, zIndex: 1 }}>
        <ReminderButton
          title={name}
          notes={description}
          startDate={new Date()}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#f5dd4b",
              fontFamily: SEMI_BOLD,
              fontSize: 20,
            }}
          >
            Mark as started
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isStarted ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleStarted}
            value={isStarted}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontFamily: SEMI_BOLD,
              fontSize: 20,
            }}
          >
            Mark as completed
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={isCompleted ? "white" : "#f4f3f4"}
            //   ios_backgroundColor="#3e3e3e"
            onValueChange={toggleComplete}
            value={isCompleted}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 50,
    gap: 20,
  },
  headerText: {
    fontSize: 30,
    fontFamily: SEMI_BOLD,
    color: Colors.light,
  },
  descriptionContainer: {
    marginTop: 8,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    width: "100%",
    height: 100,
  },
  descriptionText: {
    color: Colors.light,
    fontSize: 16,
  },
  allAttachmentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  attachmentContainer: {
    borderWidth: 1,
    borderColor: Colors.light,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
