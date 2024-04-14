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

export const TaskBottomSheet = ({
  isViewingTask,
  setIsViewingTask,
  bottomSheetRef,
}: {
  isViewingTask: TaskItemProps | null;
  setIsViewingTask: React.Dispatch<React.SetStateAction<TaskItemProps | null>>;
  bottomSheetRef: React.MutableRefObject<BottomSheet | null>;
}) => {
  // ref

  const snapPoints = useMemo(() => ["50%", "85%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const { name, completed } = isViewingTask ?? {};

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
          {!completed && (
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: Colors.light,
                backgroundColor: "orange",
              }}
            ></View>
          )}
          <Ionicons
            name="close"
            color={Colors.light}
            size={30}
            onPress={() => {
              bottomSheetRef.current?.close();
            }}
          />
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 24,
              fontFamily: SEMI_BOLD,
              textAlign: "center",
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, width: "100%", gap: 5 }}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 15,
              fontFamily: SEMI_BOLD,
              textAlign: "left",
            }}
          >
            Description
          </Text>
          <View style={styles.descriptionContainer}></View>
        </View>
        <View style={{ paddingHorizontal: 10, width: "100%", gap: 5 }}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 15,
              fontFamily: SEMI_BOLD,
              textAlign: "left",
            }}
          >
            Remark
          </Text>
          <BottomSheetTextInput multiline={true} style={styles.input} />
        </View>
        <View style={{ paddingHorizontal: 10, gap: 5, width: "100%" }}>
          <Text
            style={{
              color: Colors.light,
              fontSize: 15,
              fontFamily: SEMI_BOLD,
              textAlign: "left",
            }}
          >
            Attachments
          </Text>
          <View>
            <Ionicons name="add" color={Colors.light} size={30} />
          </View>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontFamily: SEMI_BOLD,
              fontSize: 20,
            }}
          >
            Mark as completed
          </Text>
          <View
            style={{
              height: 22,
              width: 60,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.light,
              backgroundColor: "green",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Colors.light,
                backgroundColor: "white",
              }}
            ></View>
          </View>
        </Pressable>
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
    alignItems: "center",
    backgroundColor: Colors.darkGrey,
    gap: 20,
    marginHorizontal: 10,
  },
  handle: {
    backgroundColor: Colors.light,
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
