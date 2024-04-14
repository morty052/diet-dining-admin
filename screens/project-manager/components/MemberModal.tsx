import { Modal, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../constants/colors";
import { memberProps } from "../../../types/MemberProps";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../../constants/fontNames";
import * as Linking from "expo-linking";

async function emailAdmin(email: string) {
  await Linking.openURL(`mailto:${email}`);
}

async function sendPushNotification({
  expoPushToken,
  title,
  body,
}: {
  expoPushToken: string;
  title: string;
  body: string;
}) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Reminder for ggg",
    body: "reminder for ggg",
    data: { someData: "goes here" },
  };

  try {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.log(error);
  }
  console.log("sent");
}

function EmailButton({ email }: { email: string }) {
  return (
    <Pressable onPress={() => emailAdmin(email)} style={styles.iconContainer}>
      <Ionicons name="mail" size={30} color={Colors.light} />
    </Pressable>
  );
}
function NotifyButton({ expo_push_token }: { expo_push_token: string }) {
  return (
    <Pressable
      onPress={() =>
        sendPushNotification({
          expoPushToken: expo_push_token,
          title: "ggg",
          body: "ggg",
        })
      }
      style={styles.iconContainer}
    >
      <Ionicons name="notifications" size={30} color={Colors.light} />
    </Pressable>
  );
}

const MemberModal = ({
  isOpen,
  setIsOpen,
  member,
}: {
  isOpen: boolean;
  member: memberProps;
  setIsOpen: (b: boolean) => void;
}) => {
  const {
    admin_avatar,
    admin_firstname,
    admin_lastname,
    admin_email,
    admin_role,
    expo_push_token,
  } = member ?? {};
  return (
    <Modal style={{}} animationType="slide" visible={isOpen}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
        <Ionicons
          name="close"
          onPress={() => setIsOpen(false)}
          size={30}
          color="white"
          style={{ marginLeft: 5, marginTop: 5 }}
        />
        <View
          style={{
            flex: 1,
            paddingTop: 20,
            paddingHorizontal: 10,
            gap: 20,
          }}
        >
          <Image
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              alignSelf: "center",
            }}
            source={{ uri: admin_avatar }}
          />
          <View>
            <Text
              style={{
                color: Colors.light,
                textAlign: "center",
                fontFamily: SEMI_BOLD,
                fontSize: 30,
              }}
              onPress={() => setIsOpen(false)}
            >
              {admin_role}
            </Text>
            <Text
              style={{
                color: Colors.light,
                textAlign: "center",
                fontFamily: SEMI_BOLD,
                fontSize: 25,
              }}
              onPress={() => setIsOpen(false)}
            >
              {admin_firstname} {admin_lastname}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              alignSelf: "center",
            }}
          >
            <EmailButton email={admin_email} />
            <NotifyButton expo_push_token={expo_push_token} />
          </View>

          <View style={{ height: 1, backgroundColor: Colors.gray }}></View>
          <View style={{ gap: 20 }}>
            <Text
              style={{
                color: Colors.light,
                fontSize: 18,
                fontFamily: SEMI_BOLD,
              }}
            >
              Recent Activites
            </Text>
            <View
              style={{
                backgroundColor: Colors.lightBlack,
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Text
                style={{
                  color: Colors.light,
                  fontFamily: SEMI_BOLD,
                  fontSize: 14,
                }}
              >
                Joined Project
              </Text>

              <View
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 5,
                }}
              >
                <Text
                  style={{
                    color: Colors.light,
                    fontFamily: SEMI_BOLD,
                    fontSize: 12,
                  }}
                >
                  10:30am
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.lightBlack,
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Text
                style={{
                  color: Colors.light,
                  fontFamily: SEMI_BOLD,
                  fontSize: 14,
                }}
              >
                Started Task: Select Processor
              </Text>

              <View
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 5,
                }}
              >
                <Text
                  style={{
                    color: Colors.light,
                    fontFamily: SEMI_BOLD,
                    fontSize: 12,
                  }}
                >
                  11:45am
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default MemberModal;

const styles = StyleSheet.create({
  allMembersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: Colors.light,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightBlack,
  },
});
