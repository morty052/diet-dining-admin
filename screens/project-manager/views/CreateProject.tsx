import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function CreateProjectName() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: SEMI_BOLD, fontWeight: "bold" }}>
        CreateProject
      </Text>
    </View>
  );
}

const CreateProject = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateProjectName" component={CreateProjectName} />
      <Stack.Screen
        name="CreateProjectDescription"
        component={CreateProjectName}
      />
      <Stack.Screen name="ProjectAttachments" component={CreateProjectName} />
      <Stack.Screen name="ProjectMembers" component={CreateProjectName} />
      <Stack.Screen name="ProjectTasks" component={CreateProjectName} />
    </Stack.Navigator>
  );
};

export default CreateProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.darkGrey,
  },
  box: {
    height: 200,
    width: 200,
    backgroundColor: "purple",
  },
});
