import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import { ControlButtons } from "../../components";
import { TaskAttachmentSheet } from "./TaskAttachmentSheet";
import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

type Props = {};

function AttachmentButton({
  type,
  handleOpen,
}: {
  type: "FILE" | "IMAGE" | "LINK";
  handleOpen: (type: "FILE" | "IMAGE" | "LINK") => void;
}) {
  return (
    <Pressable onPress={() => handleOpen(type)} style={styles.attachmentButton}>
      <Text style={styles.attachmentButtonText}>{type}</Text>
      <Ionicons name="add-circle" color={Colors.primary} size={30} />
    </Pressable>
  );
}

const TaskAttachments = ({ navigation }: any) => {
  const [attachmentType, setAttachmentType] = React.useState("");
  const [modalOpen, setModalOpen] = React.useState(false);
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  function handleOpen(type: string) {
    setAttachmentType(type);
    bottomSheetRef.current?.snapToIndex(0);
    setModalOpen(true);
  }

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <View>
          <Text style={styles.headerText}>Task Attachments ?</Text>
          <Text style={styles.subtitle}>
            Add files, images or links relevant to your task
          </Text>
        </View>
        <AttachmentButton
          handleOpen={(type) => handleOpen(type)}
          type="IMAGE"
        />
        <AttachmentButton handleOpen={(type) => handleOpen(type)} type="FILE" />
        <AttachmentButton handleOpen={(type) => handleOpen(type)} type="LINK" />
      </View>
      <ControlButtons handlePress={() => navigation.navigate("TaskDueDate")} />
      <TaskAttachmentSheet
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        attachmentType={attachmentType}
        bottomSheetRef={bottomSheetRef}
      />
    </View>
  );
};

export default TaskAttachments;

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
  attachmentButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightBlack,
  },
  attachmentButtonText: {
    color: Colors.light,
    fontFamily: SEMI_BOLD,
    fontSize: 20,
    textTransform: "capitalize",
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
