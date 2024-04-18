import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../constants/fontNames";

const AttachLinkView = () => {
  return (
    <View style={{ paddingHorizontal: 10, gap: 20 }}>
      <Text style={styles.taskTypText}></Text>
      <View>
        <Text style={styles.taskTypText}>{"Link Title"}</Text>
        <BottomSheetTextInput
          placeholderTextColor={Colors.muted}
          placeholder="Example: Link to pricing page"
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.taskTypText}>{"Link"}</Text>
        <BottomSheetTextInput
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
        <BottomSheetTextInput
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
  return (
    <View style={{ paddingHorizontal: 10, gap: 20 }}>
      <Text style={styles.taskTypText}></Text>
      <View>
        <Text style={styles.taskTypText}>{"File Title"}</Text>
        <BottomSheetTextInput
          placeholderTextColor={Colors.muted}
          placeholder="Example: Diet dining app user stories"
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.taskTypText}>{"Upload File"}</Text>
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
}: {
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
  attachmentType: string;
}) => {
  // ref

  const snapPoints = useMemo(() => ["100%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const activeType = useMemo(
    () =>
      attachmentViewObject[attachmentType as keyof typeof attachmentViewObject],
    [attachmentType]
  );

  if (!attachmentType) {
    return null;
  }

  // renders
  return (
    <BottomSheet
      backgroundStyle={styles.container}
      handleIndicatorStyle={styles.handle}
      index={-1}
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
    >
      <BottomSheetView style={styles.contentContainer}>
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
              bottomSheetRef.current?.close();
            }}
          />
        </View>
        {activeType}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 24,
    backgroundColor: Colors.darkGrey,
    borderWidth: 1,
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
