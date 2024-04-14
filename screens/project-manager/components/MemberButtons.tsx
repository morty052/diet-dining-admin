import { StyleSheet, Text, View, Image, Modal, Pressable } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import { TaskItemProps } from "../../../types/TaskItemProps";
import { SafeAreaView } from "react-native-safe-area-context";
import { memberProps } from "../../../types/MemberProps";
import MemberModal from "./MemberModal";

type Props = {
  members: Partial<TaskItemProps["members"]>;
};

const MemberAvatar = ({
  admin_avatar,
  onPress,
}: {
  admin_avatar: string;
  onPress: () => void;
}) => {
  return (
    <Pressable onPress={onPress}>
      <Image
        style={styles.memberContainer}
        source={{
          uri: admin_avatar,
        }}
      />
    </Pressable>
  );
};

const MemberButtons = ({ members }: Props) => {
  const [isOpen, setisOpen] = React.useState(false);
  const [memberToView, setMemberToView] = React.useState<
    memberProps | undefined
  >();
  return (
    <>
      <Text
        style={{
          color: Colors.light,
          fontSize: 15,
          fontFamily: SEMI_BOLD,
          textAlign: "left",
        }}
      >
        Members
      </Text>
      <View style={styles.allMembersContainer}>
        {members?.map((member, index) => (
          <MemberAvatar
            onPress={() => {
              setisOpen(true);
              setMemberToView(member);
            }}
            admin_avatar={member?.admin_avatar as string}
            key={index}
          />
        ))}
      </View>
      <MemberModal
        setIsOpen={setisOpen}
        member={memberToView as memberProps}
        isOpen={isOpen}
      />
    </>
  );
};

export default MemberButtons;

const styles = StyleSheet.create({
  allMembersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  memberContainer: {
    borderWidth: 1,
    borderColor: Colors.light,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
