import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProjectManager } from "../screens";
import CreateProject from "../screens/project-manager/views/CreateProject";
import BackButton from "../components/ui/BackButton";
import Colors from "../constants/colors";
import TaskScreen from "../screens/project-manager/views/TaskScreen";

type Props = {};

const Stack = createNativeStackNavigator();

const ProjectManagerStack = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          headerTitleAlign: "center",
          title: "Projects",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.darkGrey },
        }}
        name="Projects"
        component={ProjectManager}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton isCancel />,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.darkGrey },
        }}
        name="CreateProject"
        component={CreateProject}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton isCancel />,
          headerTitleAlign: "center",
          title: "",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: Colors.darkGrey },
          animation: "slide_from_bottom",
        }}
        name="TaskScreen"
        component={TaskScreen}
      />
    </Stack.Navigator>
  );
};

export default ProjectManagerStack;

const styles = StyleSheet.create({});
