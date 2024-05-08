import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
} from "react-native";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../constants/fontNames";
import * as DocumentPicker from "expo-document-picker";

const AttachLinkView = () => {
  return (
    <View style={{ paddingHorizontal: 10, gap: 20 }}>
      <Text style={styles.taskTypText}></Text>
      <View>
        <Text style={styles.taskTypText}>{"Link Title"}</Text>
        <TextInput
          placeholderTextColor={Colors.muted}
          placeholder="Example: Link to pricing page"
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.taskTypText}>{"Link"}</Text>
        <TextInput
          placeholderTextColor={Colors.muted}
          placeholder="Example: https://dietdining.org"
          style={styles.input}
        />
      </View>
    </View>
  );
};

const AttachImageView = () => {
  return (
    <View style={{ paddingHorizontal: 10, gap: 20 }}>
      <Text style={styles.taskTypText}></Text>
      <View>
        <Text style={styles.taskTypText}>{"Image Title"}</Text>
        <TextInput
          placeholderTextColor={Colors.muted}
          placeholder="Example: Driver app design image"
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.taskTypText}>{"Upload Image"}</Text>
      </View>
    </View>
  );
};

const AttachFileView = () => {
  const [title, setTitle] = React.useState("");
  const [files, setFiles] = React.useState<
    DocumentPicker.DocumentPickerResult[]
  >([]);

  return (
    <View style={{ paddingHorizontal: 10, gap: 20 }}>
      <Text style={styles.taskTypText}></Text>
      <View>
        <Text style={styles.taskTypText}>{"File Title"}</Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.muted,
            fontFamily: SEMI_BOLD,
          }}
        >
          {"Leave blank to use original file name"}
        </Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          onEndEditing={() => console.log("title", title)}
          placeholderTextColor={Colors.muted}
          placeholder="Example: Diet dining app user stories"
          style={styles.input}
        />
      </View>

      <Pressable
        style={{
          backgroundColor: Colors.primary,
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
        onPress={async () => {
          const doc = await DocumentPicker.getDocumentAsync();
          const { canceled, assets } = doc ?? {};
          if (canceled) {
            console.log("cancelled");
            return;
          }
          setFiles((prev) => [...prev, doc]);
        }}
      >
        <Text style={styles.taskTypText}>{"Upload File"}</Text>
      </Pressable>

      <View style={{ gap: 25 }}>
        {files?.map((file, index) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={index}
          >
            <Ionicons name="document" color={Colors.light} size={30} />
            <View style={{ flex: 1, marginLeft: 5 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.muted,
                  fontFamily: SEMI_BOLD,
                }}
              >
                {file.assets?.[0].name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.muted,
                  fontFamily: SEMI_BOLD,
                }}
              >
                {file.assets?.[0].size} KB
              </Text>
            </View>
            <Ionicons name="close" color={Colors.danger} size={30} />
          </View>
        ))}
      </View>
    </View>
  );
};

const attachmentViewObject = {
  LINK: <AttachLinkView />,
  IMAGE: <AttachImageView />,
  FILE: <AttachFileView />,
};

export const TaskAttachmentSheet = ({
  bottomSheetRef,
  attachmentType,
  modalOpen,
  setModalOpen,
}: {
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
  attachmentType: string;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // ref

  const snapPoints = useMemo(() => ["100%"], []);

  const activeType = useMemo(
    () =>
      attachmentViewObject[attachmentType as keyof typeof attachmentViewObject],
    [attachmentType]
  );

  if (!attachmentType) {
    return null;
  }

  return (
    // <BottomSheet
    //   backgroundStyle={styles.container}
    //   handleIndicatorStyle={styles.handle}
    //   index={-1}
    //   snapPoints={snapPoints}
    //   ref={bottomSheetRef}
    //   onChange={handleSheetChanges}
    // >
    //   <BottomSheetView style={styles.contentContainer}>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         width: "100%",
    //         paddingHorizontal: 10,
    //       }}
    //     >
    //       <Text style={styles.taskTypText}>Attach {attachmentType}</Text>
    //       <Ionicons
    //         name="close"
    //         color={Colors.light}
    //         size={30}
    //         onPress={() => {
    //           bottomSheetRef.current?.close();
    //         }}
    //       />
    //     </View>
    //     {activeType}
    //   </BottomSheetView>
    // </BottomSheet>
    <Modal animationType="slide" visible={modalOpen}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Text style={styles.taskTypText}>Attach {attachmentType}</Text>
          <Ionicons
            name="close"
            color={Colors.light}
            size={30}
            onPress={() => {
              setModalOpen(false);
            }}
          />
        </View>
        {activeType}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: Colors.darkGrey,
    borderColor: Colors.light,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    gap: 20,
  },
  handle: {
    backgroundColor: Colors.light,
  },
  taskTypText: {
    fontSize: 16,
    color: Colors.light,
    fontFamily: SEMI_BOLD,
    textTransform: "capitalize",
  },
  input: {
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 10,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    width: "100%",
    height: 50,
    color: "white",
  },
  descriptionContainer: {
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 10,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    width: "100%",
    textAlignVertical: "top",
    height: 100,
    color: "white",
  },
});
