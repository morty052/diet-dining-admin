import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import { TaskBottomSheet } from "./components/TaskBottomSheet";
import { TaskItemProps } from "../../types/TaskItemProps";
import BottomSheet from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { baseUrl } from "../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";

type ProjectProps = {
  name: string;
  color: string;
  members: { name: string; avatar: string }[];
  tasks: TaskItemProps[];
  completion: number;
  _id: string | number;
};

type ProjectCardProps = {
  name: string;
  color: string;
  members: { name: string; avatar: string }[];
  completion: number;
  _id: string | number;
  tasks: TaskItemProps[];
};

// const projectsArray: ProjectProps[] = [
//   {
//     name: "Get payment provider",
//     color: "indigo",
//     members: [
//       {
//         name: "Kunle",
//         avatar: "",
//       },
//       {
//         name: "Kunle",
//         avatar: "",
//       },
//       {
//         name: "Kunle",
//         avatar: "",
//       },
//     ],
//     tasks: [
//       {
//         name: "Decide on Provider",
//         completed: true,
//         _id: "string",
//         type: "POLL",
//         description:
//           "Review available payment providers to find most suitable one",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//       {
//         name: "Create Account",
//         completed: false,
//         _id: "string",
//         type: "ACTION",
//         description:
//           "Create an account on agreed provider on behalf of diet dining",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//       {
//         name: "Integrate provider in user app",
//         completed: false,
//         _id: "string",
//         type: "ACTION",
//         description: "Add payment provider to necessary platforms",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//       // {
//       //   name: "Integrate provider in user app",
//       //   completed: false,
//       //   _id: "string",
//       //   type: "ACTION",
//       // },
//       // {
//       //   name: "Integrate provider in user app",
//       //   completed: false,
//       //   _id: "string",
//       //   type: "ACTION",
//       // },
//       // {
//       //   name: "Integrate provider in user app",
//       //   completed: false,
//       //   _id: "string",
//       //   type: "ACTION",
//       // },
//     ],
//     completion: 0,
//     _id: "tring | number",
//   },
//   {
//     name: "Inspect new driver app",
//     color: "navy",
//     members: [
//       {
//         name: "Kunle",
//         avatar: "",
//       },
//     ],
//     completion: 20,
//     _id: "tring | number",
//     tasks: [
//       {
//         name: "Send app to all executives",
//         completed: false,
//         _id: "string",
//         type: "ACTION",
//         description: "Share preview copy of drivers app to all executives",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//       {
//         name: "Meeting to discuss takeaways from app review",
//         completed: false,
//         _id: "string",
//         type: "ACTION",
//         description:
//           "Team meeting to discuss individual experience and remarks on the drivers app",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Hire social media manager",
//     color: "orange",
//     members: [
//       {
//         name: "Kunle",
//         avatar: "",
//       },
//     ],
//     completion: 20,
//     _id: "tring | number",
//     tasks: [
//       {
//         name: "Decide on Provider",
//         completed: true,
//         _id: "string",
//         type: "POLL",
//         description: "",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//       {
//         name: "Create Account",
//         completed: false,
//         _id: "string",
//         type: "ACTION",
//         description: "",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//       {
//         name: "Integrate provider in user app",
//         completed: false,
//         _id: "string",
//         type: "ACTION",
//         description: "",
//         members: [
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//           {
//             name: "Kunle",
//             avatar: "",
//           },
//         ],
//       },
//     ],
//   },
// ];

const fetchProjects = async () => {
  const res = await fetch(`${baseUrl}/utils/projects/get-all`);
  const projects = await res.json();
  return projects;
};

const getProgressPercentage = (project: any) => {
  const completed = project.tasks?.filter((task: any) => task.completed).length;
  const progress = Math.floor((completed / project.tasks.length) * 100);

  return `${progress}%`;
};

const ProjectCard = ({ project }: { project: ProjectCardProps }) => {
  const { name, color, completion, _id, members, tasks } = project ?? {};

  const progress = React.useMemo(
    () => getProgressPercentage(project),
    [project]
  );

  return (
    <View style={[styles.projectCardcontainer, { backgroundColor: color }]}>
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 50, fontFamily: SEMI_BOLD }}>
          {progress}
        </Text>
        <Text style={{ color: "white", fontSize: 20 }}>{name}</Text>
      </View>
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 18 }}>
          {members?.length} Members
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {members?.map((member: any, index) => (
            <Image
              key={index}
              source={{ uri: member.admin_avatar }}
              style={{
                borderRadius: 20,
                height: 40,
                width: 40,
                borderColor: Colors.light,
                borderWidth: 1,
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const TaskItem = ({
  task,
  project_color,
}: {
  task: TaskItemProps;
  project_color: string;
}) => {
  const { name, type, completed } = task ?? {};
  const navigation = useNavigation();
  return (
    <Animated.View exiting={FadeOutLeft} entering={FadeInLeft}>
      <Pressable
        onPress={() => {
          // @ts-ignore
          navigation.navigate("TaskScreen", {
            task,
          });
        }}
        style={{
          borderWidth: 1,
          borderColor: Colors.light,
          padding: 10,
          gap: 5,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {completed && (
            <Ionicons
              size={20}
              color={Colors.light}
              name={completed ? "checkmark-circle" : "checkmark"}
            />
          )}
          {!completed && (
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.light,
                backgroundColor: project_color,
              }}
            ></View>
          )}
          <Text
            style={{
              color: "white",
              fontSize: 18,
              flex: 1,
              textDecorationLine: completed ? "line-through" : undefined,
            }}
          >
            {name}
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 12,
            textAlign: "right",
          }}
        >
          2 days ago
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export const ProjectManager = ({ navigation }: any) => {
  const [activeProject, setActiveProject] = React.useState(0);
  const projectGridRef = React.useRef<FlatList>(null);

  const {
    isLoading,
    refetch,
    data: projects,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  useRefreshOnFocus(refetch);

  if (isLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
      <View style={styles.container}>
        <View style={{ gap: 20, paddingHorizontal: 10 }}>
          {/* PROJECTS */}
          <FlatList
            ref={projectGridRef}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 60,
            }}
            onViewableItemsChanged={({ viewableItems }) => {
              setActiveProject(viewableItems[0].index ?? 0);
            }}
            contentContainerStyle={styles.projectsContainer}
            horizontal
            data={projects}
            renderItem={({ item, index }) => <ProjectCard project={item} />}
          />
        </View>
        {/* TASKS */}
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.headerText}>Tasks</Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 80,
            paddingHorizontal: 10,
          }}
        >
          <FlatList
            scrollEnabled={false}
            ref={projectGridRef}
            contentContainerStyle={styles.tasksContainer}
            data={projects[activeProject].tasks}
            renderItem={({ item }) => (
              <TaskItem
                project_color={projects[activeProject].color}
                task={item}
              />
            )}
          />
        </ScrollView>
        {/* BUTTON */}
        <View
          style={{
            // backgroundColor: "red",
            position: "absolute",
            bottom: Platform.select({ ios: 20, android: 0 }),
            left: 0,
            right: 0,
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons
            onPress={() => navigation.navigate("CreateProject")}
            color={Colors.light}
            size={70}
            name="add-circle-outline"
          />
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    gap: 10,
    paddingTop: 20,
    position: "relative",
  },
  headerText: {
    fontSize: 30,
    color: Colors.light,
    fontFamily: SEMI_BOLD,
  },
  projectsContainer: {
    gap: 20,
    height: 300,
    // flex: 1,
  },
  projectCardcontainer: {
    borderWidth: 1,
    borderColor: Colors.light,
    width: 280,
    height: 300,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 10,

    gap: 10,
    justifyContent: "space-between",
  },
  tasksContainer: {
    gap: 20,
  },
});
