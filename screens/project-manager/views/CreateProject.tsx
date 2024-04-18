import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { baseUrl } from "../../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { memberProps } from "../../../types/MemberProps";
import { TaskTypeInfoSheet } from "../components/TaskBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { ControlButtons } from "../../../components";
import { useNewProject } from "../../../models/newProject";
import DatePicker from "react-native-date-picker";

const Stack = createNativeStackNavigator();

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

async function getAdmins() {
  const res = await fetch(`${baseUrl}/admin/get-admins`);
  const data = await res.json();
  const { admins } = data;
  return admins;
}

function AdminCard({
  admin,
  onSelect,
}: {
  admin: memberProps;
  onSelect: (admin: memberProps) => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.lightBlack,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          flex: 1,
        }}
      >
        <Image
          source={{ uri: admin.admin_avatar }}
          style={{
            borderRadius: 20,
            height: 40,
            width: 40,
            borderColor: Colors.light,
            borderWidth: 1,
          }}
        />
        <View>
          <Text
            style={{
              color: Colors.light,
              fontSize: 16,
            }}
          >
            {admin.admin_firstname}
          </Text>
          <Text
            style={{
              color: Colors.light,
              fontSize: 16,
            }}
          >
            {admin.admin_role}
          </Text>
        </View>
      </View>

      <Pressable onPress={() => onSelect(admin)}>
        <Ionicons
          name="add-circle-outline"
          size={30}
          color={Colors.light}
          style={{ marginLeft: "auto" }}
        />
      </Pressable>
    </View>
  );
}

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

function CreateProjectName({ navigation }: any) {
  const [projectName, setProjectName] = React.useState("");
  const [error, setError] = React.useState("");
  const { setName } = useNewProject();

  const handleNext = () => {
    if (!projectName) {
      setError("Please enter project name");
      return;
    }

    setName(projectName);
    navigation.navigate("CreateProjectDescription");
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
            What is your project name?
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
            }}
          >
            Enter a suitable name to refer to your project
          </Text>
        </View>
        <TextInput
          autoFocus
          value={projectName}
          onChangeText={(text) => setProjectName(text)}
          placeholderTextColor={Colors.muted}
          placeholder="Project Name"
          style={styles.input}
        />
      </View>
      <ControlButtons handlePress={() => handleNext()} />
    </View>
  );
}

function CreateProjectDescription({ navigation }: any) {
  const [projectDescription, setProjectDescription] = React.useState("");
  const [error, setError] = React.useState("");
  const { setDescription } = useNewProject();

  const handleNext = () => {
    if (!projectDescription) {
      setError("Please enter project description");
      return;
    }

    setDescription(projectDescription);
    navigation.navigate("ProjectMembers");
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
            Enter project description
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
            }}
          >
            Create a short description of your project
          </Text>
        </View>
        <TextInput
          value={projectDescription}
          onChangeText={(text) => setProjectDescription(text)}
          multiline
          autoFocus
          placeholderTextColor={Colors.muted}
          placeholder="Project Description"
          style={[
            styles.input,
            { height: 100, textAlignVertical: "top", padding: 10 },
          ]}
        />
      </View>
      <ControlButtons handlePress={() => handleNext()} />
    </View>
  );
}

function AddProjectMembers({ navigation }: any) {
  const [query, setQuery] = React.useState("");
  const [selectedMembers, setSelectedMembers] = React.useState<memberProps[]>(
    []
  );
  const { data: admins, isLoading } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  const queryResults = React.useMemo(() => {
    if (!query) {
      return [];
    }

    const results = admins?.filter((admin: memberProps) => {
      const name = `${admin.admin_firstname} ${admin.admin_lastname}`;
      if (admin.admin_role.toLowerCase().includes(query.toLowerCase())) {
        return admin;
      }
      return name.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }, [query]);

  const { setProjectMembers } = useNewProject();

  const handleSelect = (admin: memberProps) => {
    setSelectedMembers((prev) => [...prev, admin]);
  };

  const handleContinue = () => {
    if (selectedMembers.length > 0) {
      setProjectMembers(selectedMembers);
    }
    navigation.navigate("ProjectDeadline");
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
            Add project members
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
            }}
          >
            Add other admins as members to take part in your project
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: Colors.lightBlack,
            borderRadius: 10,
            paddingHorizontal: 10,
          }}
        >
          <Ionicons name="search" size={30} color={Colors.muted} />
          <TextInput
            autoFocus
            onChangeText={(text) => setQuery(text)}
            value={query}
            placeholderTextColor={Colors.muted}
            placeholder="Search by name or title"
            style={[styles.input, { flex: 1, backgroundColor: "transparent" }]}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {selectedMembers?.map((admin: memberProps, index) => (
            <Image
              key={index}
              source={{ uri: admin.admin_avatar }}
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
          ))}
        </View>
        {queryResults?.map((admin: memberProps) => (
          <AdminCard
            onSelect={(admin) => handleSelect(admin)}
            admin={admin}
            key={admin._id}
          />
        ))}
      </View>
      <ControlButtons handlePress={handleContinue} />
    </View>
  );
}

function ProjectDeadline({ navigation }: any) {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);

  const { setDueDate, createProject } = useNewProject();

  const handlePress = async () => {
    const due_date = date.toISOString();
    setDueDate(due_date);
    const _id = await createProject();
    navigation.navigate("ProjectCreated", { _id });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingBottom: 100,
        }}
      >
        <View>
          <Text style={styles.headerText}>Project due date</Text>
          <Text style={styles.subtitle}>
            Enter a due date for your project.
          </Text>
        </View>
        <Pressable onPress={() => setOpen(true)}>
          <Text style={styles.headerText}>Open Calendar</Text>
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={async (date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          theme="dark"
          minimumDate={new Date()}
        />
      </View>
      <ControlButtons handlePress={handlePress} />
    </View>
  );
}

function ProjectCreatedScreen({ navigation }: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.darkGrey,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 200,
        paddingHorizontal: 20,
      }}
    >
      <View style={{ gap: 20, width: "100%" }}>
        <View>
          <Text
            style={{
              fontFamily: SEMI_BOLD,
              fontWeight: "bold",
              color: Colors.light,
              fontSize: 24,
              textAlign: "center",
            }}
          >
            Project Created
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Your project has been added to the cloud
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("CreateTaskRoutes")}
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
            Setup Tasks
          </Text>
        </Pressable>
        <Text
          style={{
            fontWeight: "normal",
            color: Colors.muted,
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Skip for now
        </Text>
      </View>
    </View>
  );
}

function AddTasks({ navigation }: any) {
  const [open, setOpen] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [taskType, setTaskType] = React.useState("");

  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const handleSelect = (value: string) => {
    setTaskType(value);
    setOpen(false);
  };

  const handlePressInfo = (value: string) => {
    setTaskType(value);
    bottomSheetRef.current?.snapToIndex(0);
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
            Add project tasks
          </Text>
          <Text
            style={{
              fontWeight: "normal",
              color: Colors.light,
              fontSize: 16,
            }}
          >
            Add at least one task to your project (tasks can be added later)
          </Text>
        </View>
        <TextInput
          autoFocus
          placeholderTextColor={Colors.muted}
          placeholder="Task Name"
          style={styles.input}
        />
        {/* <TextInput
          multiline
          placeholderTextColor={Colors.muted}
          placeholder="Task Description"
          style={[
            styles.input,
            { height: 90, textAlignVertical: "top", padding: 10 },
          ]}
        /> */}
        <View style={{ position: "relative" }}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setOpen(!open);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ color: Colors.light }}>Task Type</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.muted} />
          </Pressable>
          {open && (
            <View
              style={{
                backgroundColor: Colors.lightBlack,
                gap: 10,
                paddingBottom: 20,
                paddingHorizontal: 10,
                paddingTop: 10,
                borderRadius: 10,
                position: "absolute",
                bottom: -280,
                left: 0,
                right: 0,
                height: 270,
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
        </View>
      </View>
      {/* <ControlButtons
        handlePress={() => navigation.navigate("CreateProjectDescription")}
      /> */}
      <TaskTypeInfoSheet taskType={taskType} bottomSheetRef={bottomSheetRef} />
    </KeyboardAvoidingView>
  );
}

const CreateProject = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CreateProjectName" component={CreateProjectName} />
      <Stack.Screen
        name="CreateProjectDescription"
        component={CreateProjectDescription}
      />
      <Stack.Screen name="ProjectMembers" component={AddProjectMembers} />
      <Stack.Screen name="ProjectDeadline" component={ProjectDeadline} />
      <Stack.Screen name="ProjectCreated" component={ProjectCreatedScreen} />
      <Stack.Screen name="ProjectTasks" component={AddTasks} />
    </Stack.Navigator>
  );
};

export default CreateProject;

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
  subtitle: {
    fontWeight: "normal",
    color: Colors.light,
    fontSize: 16,
    textAlign: "center",
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
