import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import MemberButtons from "../components/MemberButtons";
import TaskItem from "../components/TaskItem";
import { Ionicons } from "@expo/vector-icons";
import { useNewTask } from "../../../models/newTask";

type Props = {};

const ProjectScreen = ({ navigation, route }: any) => {
  const { project } = route.params;
  const { name, description, members, color, tasks, _id } = project ?? {};
  const { setProject } = useNewTask();

  function handleAddTask() {
    setProject(_id);
    navigation.navigate("CreateTaskRoutes");
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 10 }}>
        <Text style={styles.projectName}>{name}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      </View>
      <MemberButtons members={members} />
      <View style={styles.tasksHeaderContainer}>
        <Text style={styles.projectName}>Tasks</Text>
        <Ionicons
          onPress={handleAddTask}
          name="add-circle"
          color={Colors.primary}
          size={30}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <FlatList
          scrollEnabled={false}
          contentContainerStyle={styles.tasksContainer}
          data={tasks}
          renderItem={({ item }) => (
            <TaskItem project_color={color} task={item} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    gap: 20,
    paddingHorizontal: 10,
  },
  projectName: {
    color: Colors.light,
    fontSize: 24,
    fontFamily: SEMI_BOLD,
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
  tasksHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  tasksContainer: {
    gap: 20,
  },
});
