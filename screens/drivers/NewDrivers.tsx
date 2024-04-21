import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { baseUrl } from "../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/ui/LoadingScreen";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";

type Props = {};

async function getUnVerifiedDrivers() {
  const res = await fetch(`${baseUrl}/admin/get-all-drivers`);
  const data = await res.json();
  const drivers = data.data;
  const verifiedDrivers = drivers.filter(
    (driver: any) => driver.verified === false
  );
  return verifiedDrivers;
}

const NewDrivers = ({ navigation }: any) => {
  const {
    data: drivers,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["UnVerified_drivers"],
    queryFn: getUnVerifiedDrivers,
  });

  useRefreshOnFocus(refetch);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons size={24} color={"white"} name="search-outline" />
        <TextInput
          placeholderTextColor={"white"}
          placeholder="Search All Drivers"
          className="w-full p-2 text-white"
        />
      </View>
      {drivers.length === 0 && !isLoading && (
        <Text style={{ color: "white", textAlign: "center" }}>
          No New Drivers
        </Text>
      )}
      <ScrollView contentContainerStyle={{ gap: 10 }}>
        {drivers?.map((driver: any) => (
          <Pressable
            onPress={() => navigation.navigate("DriverProfile", { driver })}
            key={driver._id}
            style={styles.driverCardContainer}
          >
            <View style={styles.driverInfoContainer}>
              <Image
                resizeMode="contain"
                style={styles.driverAvatar}
                source={{ uri: driver.avatar }}
              />
              <View style={{ gap: 5 }}>
                <Text
                  style={styles.driverName}
                >{`${driver.firstname} ${driver.lastname}`}</Text>
                <View
                  style={{
                    padding: 2,
                    backgroundColor: Colors.danger,
                    width: 80,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    Unverified
                  </Text>
                </View>
              </View>
            </View>
            <Ionicons size={24} color={"white"} name="chevron-forward" />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default NewDrivers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 10,
    gap: 20,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  driverCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 10,
    padding: 10,
  },
  driverInfoContainer: { flexDirection: "row", gap: 10, flex: 1 },
  driverAvatar: { width: 50, height: 50, borderRadius: 25 },
  driverName: { color: Colors.light, fontSize: 18 },
});
