import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { TextInput } from "react-native-gesture-handler";

type Props = {};

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

const ReviewSection = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Remark</Text>
      <TextInput
        placeholder="Example: I am very satisfied with it."
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        multiline
        style={styles.remarkContainer}
      />
      <Text style={[styles.titleText, { marginTop: 20 }]}>
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
      </ScrollView>
    </View>
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
});
