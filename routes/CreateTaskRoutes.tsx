import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskInfo from "../screens/create-taskscreens/TaskInfo";
import TaskTypeScreen from "../screens/create-taskscreens/TaskTypeScreen";
import AddTaskMembers from "../screens/create-taskscreens/AddTaskMembersScreen";
import TaskAttachments from "../screens/create-taskscreens/TaskAttachments";
import TaskDueDate from "../screens/create-taskscreens/TaskDueDate";
import TaskCreated from "../screens/create-taskscreens/TaskCreated";

const Stack = createNativeStackNavigator();

type Props = {};

const CreateTaskRoutes = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TaskInfo" component={TaskInfo} />
      <Stack.Screen name="TaskType" component={TaskTypeScreen} />
      <Stack.Screen name="TaskMembers" component={AddTaskMembers} />
      <Stack.Screen name="TaskAttachments" component={TaskAttachments} />
      <Stack.Screen name="TaskDueDate" component={TaskDueDate} />
      <Stack.Screen name="TaskCreated" component={TaskCreated} />
    </Stack.Navigator>
  );
};

export default CreateTaskRoutes;
