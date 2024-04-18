import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import DatePicker from "react-native-date-picker";
import { ControlButtons } from "../../components";
import { useNewTask } from "../../models/newTask";

type Props = {};

const TaskDueDate = ({ navigation }: any) => {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { setDueDate, createTask } = useNewTask();

  const handlePress = async () => {
    setLoading(true);
    if (date) {
      setDueDate(date.toISOString());
    }
    const _id = await createTask();
    setLoading(false);
    navigation.navigate("TaskCreated");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingBottom: 100,
        }}
      >
        <View>
          <Text style={styles.headerText}>Task due date</Text>
          <Text style={styles.subtitle}>
            Enter an end date or time for your task
          </Text>
        </View>
        <Pressable onPress={() => setOpen(true)}>
          <Text style={styles.headerText}>Open Calendar</Text>
        </Pressable>
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={async (date) => {
            setOpen(false);
            setDate(date);
            console.log(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          theme="dark"
          minimumDate={new Date()}
        />
      </View>
      <ControlButtons handlePress={handlePress} />
    </View>
  );
};

export default TaskDueDate;

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
    textAlign: "center",
  },
  subtitle: {
    fontWeight: "normal",
    color: Colors.light,
    fontSize: 16,
    textAlign: "center",
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
