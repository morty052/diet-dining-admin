import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import BottomSheet, {
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { TaskItemProps } from "../../../types/TaskItemProps";
import Colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../../constants/fontNames";

const explainerObject = {
  ACTION: {
    snippet:
      "The Action task type as the name implies is a single action or process, to be completed by members assigned to the task or the creator of the task.",
    example: "Create an account on behalf of the company",
    features: [],
  },
  EVENT: {
    snippet:
      "The Event task type allows the creator pick a specific date and time for a live task",
    example: "Team meeting",
  },
  REVIEW: {
    snippet:
      "The Review task type centers around collecting opinions from all members assigned to the task including the creator. assigned members would be able to leave a note on the item of interest and a satisfaction rating",
    example: "Inspect latest build of drivers app",
  },
  POLL: {
    snippet:
      "The Poll task type involves collecting votes from all members assigned to the task including the task creator on multiple suggestions set by the creator of the task. assigned members have the ability to also add suggestions",
    example: "Select new email provider",
  },
};

export const TaskTypeInfoSheet = ({
  bottomSheetRef,
  taskType,
}: {
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
  taskType: string;
}) => {
  // ref

  const snapPoints = useMemo(() => ["95%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const activeExplainer = useMemo(
    () => explainerObject[taskType as keyof typeof explainerObject],
    [taskType]
  );

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
          <Text style={styles.taskTypText}>{taskType}</Text>
          <Ionicons
            name="close"
            color={Colors.light}
            size={30}
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 10, gap: 20 }}>
          <Text style={styles.taskTypText}>{activeExplainer?.snippet}</Text>
          <View>
            <Text style={{ color: Colors.light }}>Example</Text>
            <Text style={styles.taskTypText}>{activeExplainer?.example}</Text>
          </View>
        </View>
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
    fontSize: 20,
    color: Colors.light,
    fontFamily: SEMI_BOLD,
  },
  input: {
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 10,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    width: "100%",
    textAlignVertical: "top",
    height: 80,
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
