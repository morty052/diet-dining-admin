import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { memberProps } from "../../../types/MemberProps";

type RemarkProps = {
  remark: string | undefined;
  member: memberProps;
};

const feebacksArray = [
  {
    emoji: "🙂",
    feedback: "Good",
    color: Colors.primary,
  },
  {
    emoji: "☺️",
    feedback: "Great",
    color: "lightgreen",
  },
  {
    emoji: "😃",
    feedback: "Excellent",
    color: "lime",
  },
  {
    emoji: "😐",
    feedback: "Average",
    color: "white",
  },
  {
    emoji: "👎",
    feedback: "Poor",
    color: "pink",
  },
  {
    emoji: "🚫",
    feedback: "Awful",
    color: "red",
  },
];

const FeedBackItem = ({
  emoji,
  feedback,
  color,
}: {
  emoji: string;
  feedback: string;
  color: string;
}) => {
  return (
    <View
      style={{
        width: 100,
        gap: 5,
        backgroundColor: Colors.lightBlack,
        borderRadius: 20,
        padding: 10,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 30 }}>{emoji}</Text>
      <Text
        style={{
          color,
          textAlign: "center",
          fontFamily: SEMI_BOLD,
          fontSize: 16,
        }}
      >
        {feedback}
      </Text>
    </View>
  );
};

const RemarkItem = ({
  remark,
  handleOpenRemark,
}: {
  remark: RemarkProps;
  handleOpenRemark: (remark: RemarkProps) => void;
}) => {
  return (
    <Pressable
      onPress={() => handleOpenRemark(remark)}
      style={{
        height: 40,
        width: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Colors.light,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="chatbubble" size={25} color={Colors.light} />
    </Pressable>
  );
};

const RemarkModal = ({
  isOpen,
  handleClose,
  remark,
}: {
  isOpen: boolean;
  handleClose: () => void;
  remark: RemarkProps | null;
}) => {
  return (
    <Modal animationType="slide" transparent visible={isOpen}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.lightBlack,
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            height: 350,
            backgroundColor: Colors.darkGrey,
            width: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            gap: 20,
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image
                source={{ uri: remark?.member.admin_avatar }}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: Colors.light,
                }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: SEMI_BOLD,
                    color: Colors.light,
                  }}
                >
                  {remark?.member.admin_firstname}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: SEMI_BOLD,
                    color: Colors.light,
                  }}
                >
                  {remark?.member.admin_role}
                </Text>
              </View>
            </View>
            <Ionicons
              onPress={handleClose}
              name="close-circle-outline"
              size={30}
              color={Colors.danger}
            />
          </View>
          <View style={{ paddingHorizontal: 10, gap: 10 }}>
            <Text style={styles.titleText}>
              {remark?.member.admin_firstname} remarked
            </Text>
            <View style={styles.remarkContainer}>
              <Text style={{ color: Colors.light }}>{remark?.remark}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ReviewSection = ({
  remark,
  setRemark,
  remarksArray,
}: {
  remark: string;
  setRemark: React.Dispatch<React.SetStateAction<string>>;
  remarksArray: RemarkProps[];
}) => {
  const [remarksModalOpen, setRemarksModalOpen] = React.useState(false);
  const [activeRemark, setActiveRemark] = React.useState<null | RemarkProps>(
    null
  );

  const closeRemarkModal = () => {
    setRemarksModalOpen(false);
  };

  const handleOpenRemark = (remark: RemarkProps) => {
    setActiveRemark(remark);
    setRemarksModalOpen(true);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.titleText}>Remarks</Text>
      <ScrollView contentContainerStyle={{ gap: 10 }} horizontal>
        {remarksArray?.map((remark, index) => (
          <RemarkItem
            key={index}
            remark={remark}
            handleOpenRemark={(remark) => handleOpenRemark(remark)}
          />
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TextInput
          value={remark}
          onChangeText={(text) => setRemark(text)}
          placeholder="Example: I am very satisfied with it."
          placeholderTextColor={"rgba(255,255,255,0.5)"}
          multiline
          style={styles.remarkContainer}
        />
        {/* {remark && (
          <Pressable onPress={addRemark} style={styles.submitButton}>
            <Text style={styles.titleText}>Submit</Text>
          </Pressable>
        )} */}
      </KeyboardAvoidingView>
      {/* <Text style={[styles.titleText, { marginTop: 20 }]}>
        Satisfaction rating
      </Text>
      <ScrollView
        contentContainerStyle={{ gap: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {feebacksArray.map(({ emoji, feedback, color }) => (
          <FeedBackItem
            key={feedback}
            emoji={emoji}
            feedback={feedback}
            color={color}
          />
        ))}
      </ScrollView> */}
      <RemarkModal
        isOpen={remarksModalOpen}
        handleClose={closeRemarkModal}
        remark={activeRemark}
      />
    </KeyboardAvoidingView>
  );
};

export default ReviewSection;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  titleText: {
    color: Colors.light,
    fontSize: 15,
    fontFamily: SEMI_BOLD,
    textAlign: "left",
  },
  remarkContainer: {
    backgroundColor: Colors.lightBlack,
    height: 120,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    color: Colors.light,
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
