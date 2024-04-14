import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const suggestionsArray = [
  {
    name: "Stripe",
  },
  {
    name: "Square",
  },
  {
    name: "Paypal",
  },
];

const SuggestionItem = ({
  name,
  selected,
  setSelected,
}: {
  name: string;
  selected: any;
  setSelected: (name: string) => void;
}) => {
  return (
    <Pressable
      onPress={() => setSelected(name)}
      style={{
        backgroundColor: Colors.lightBlack,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{ color: Colors.light, fontFamily: SEMI_BOLD, fontSize: 16 }}
      >
        {name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Ionicons
          name="checkmark-circle"
          color={!selected ? Colors.light : Colors.primary}
          size={24}
        />
      </View>
    </Pressable>
  );
};

const SuggestionsGrid = (props: Props) => {
  const [selected, setSelected] = React.useState<null | string>(null);
  return (
    <View style={{ gap: 10 }}>
      <Text
        style={{
          color: Colors.light,
          fontSize: 15,
          fontFamily: SEMI_BOLD,
          textAlign: "left",
        }}
      >
        Suggestions
      </Text>
      {suggestionsArray.map((suggestion, index) => (
        <SuggestionItem
          selected={selected == suggestion.name}
          setSelected={(name) => setSelected(name)}
          name={suggestion.name}
          key={index}
        />
      ))}
    </View>
  );
};

export default SuggestionsGrid;

const styles = StyleSheet.create({});
