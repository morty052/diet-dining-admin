import React from "react";
import { baseUrl } from "../../constants/baseUrl";
import { memberProps } from "../../types/MemberProps";
import { useQuery } from "@tanstack/react-query";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { ControlButtons } from "../../components";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNewTask } from "../../models/newTask";

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

function AddTaskMembers({ navigation }: any) {
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

  const { setTaskMembers } = useNewTask();

  const handleSelect = (admin: memberProps) => {
    setSelectedMembers((prev) => [...prev, admin]);
  };

  const handleContinue = () => {
    if (selectedMembers.length > 0) {
      setTaskMembers(selectedMembers);
    }
    navigation.navigate("TaskAttachments");
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={styles.headerText}>Add task members</Text>
          <Text style={styles.subtitle}>
            Add other admins as members to take part in your new task
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

export default AddTaskMembers;

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
  },
  subtitle: {
    fontWeight: "normal",
    color: Colors.light,
    fontSize: 16,
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
