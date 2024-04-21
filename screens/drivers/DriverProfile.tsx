import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { baseUrl } from "../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import BackButton from "../../components/ui/BackButton";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

function DriverStatusBar({ verified }: { verified: boolean }) {
  return (
    <View
      style={{
        width: 80,
        backgroundColor: verified ? Colors.primary : Colors.danger,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 10,
      }}
    >
      <Text style={{ color: "white" }}>
        {verified ? "Verified" : "Unverified"}
      </Text>
    </View>
  );
}

function ConfirmationModal({
  isOpen,
  setIsOpen,
  handleCancel,
  handleConfirm,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  handleConfirm: () => void;
}) {
  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "flex-end",
          paddingHorizontal: 5,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            height: 250,
            backgroundColor: "white",
            width: "100%",
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 50,
            gap: 20,
          }}
        >
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                fontSize: 30,
                fontFamily: SEMI_BOLD,
                textAlign: "center",
              }}
            >
              Verify Driver ?
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: SEMI_BOLD,
                textAlign: "center",
              }}
            >
              Driver would be able to receive orders immediately after
              verification.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", paddingHorizontal: 10, gap: 10 }}
          >
            <Pressable
              onPress={handleCancel}
              style={{
                flex: 1,
                backgroundColor: Colors.danger,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "white" }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleConfirm}
              style={{
                flex: 1,
                backgroundColor: Colors.primary,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: "white" }}>Confirm</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function ListItem({ title, value }: { title: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: Colors.light }}>{title}</Text>
      <Text style={{ fontSize: 18, color: Colors.light }}>{value}</Text>
    </View>
  );
}

const DriverProfile = ({ navigation, route }: any) => {
  const [isVerified, setisVerified] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { driver } = route.params;

  const { firstname, lastname, avatar, phone, email, vehicle, verified, _id } =
    driver ?? {};

  const toggleComplete = (value: boolean) => {
    setisVerified((previousState) => !previousState);
    if (value) {
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setisVerified((previousState) => !previousState);
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    const res = await fetch(`${baseUrl}/admin/verify-driver?driver_id=${_id}`);
    const data = await res.json();
    setisVerified(true);
    setIsOpen(false);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton />,
      headerRight: () => <DriverStatusBar verified={verified} />,
      headerTitleAlign: "center",
      title: "",
      headerTitleStyle: { color: "white" },
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.darkGrey,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={{ uri: avatar }}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <ListItem title="First name" value={firstname} />
      <ListItem title="Last name" value={lastname} />
      <ListItem title="Phone" value={phone} />
      <ListItem title="Email" value={email} />
      {!verified && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontFamily: SEMI_BOLD,
              fontSize: 20,
            }}
          >
            Verify Driver
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: Colors.primary }}
            thumbColor={isVerified ? "white" : "#f4f3f4"}
            //   ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => toggleComplete(value)}
            value={isVerified}
          />
        </View>
      )}
      <ConfirmationModal
        handleConfirm={handleConfirm}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleCancel={handleCancel}
      />
    </View>
  );
};

export default DriverProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
  },
});
