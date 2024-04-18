import { useNavigation } from "@react-navigation/native";
import { TaskItemProps } from "../../../types/TaskItemProps";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";
import { Pressable, View, Text } from "react-native";
import Colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

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

export default TaskItem;
