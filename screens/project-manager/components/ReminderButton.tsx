import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";
import * as Calendar from "expo-calendar";
import Colors from "../../../constants/colors";
import { getItem, setItem } from "../../../utils/storage";
import { day } from "../../../utils/day";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../../constants/fontNames";
import DatePicker from "react-native-date-picker";

import * as Notifications from "expo-notifications";

async function schedulePushNotification() {
  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Added to calendar📬",
        body: "Task has been added to calendar",
        data: { data: "goes here" },
      },
      trigger: null,
    });
    console.log("notification scheduled");
  } catch (error) {
    console.error(error);
  }
}

export default function ReminderButton({
  title,
  notes,
  startDate,
}: {
  title: string;
  notes: string;
  startDate: Date | string;
}) {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add to calendar</Text>
      <View style={styles.buttonContainer}>
        <Ionicons
          color={Colors.light}
          onPress={
            () =>
              // createReminder({
              //   title,
              //   notes,
              //   startDate: new Date().toISOString(),
              // })
              setOpen(true)
            // createCalendar()
          }
          size={30}
          name="calendar-outline"
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={async (date) => {
          setOpen(false);
          setDate(date);
          console.log(date);
          createReminder({
            title,
            notes,
            startDate: date.toISOString(),
          });
          await schedulePushNotification();
        }}
        onCancel={() => {
          setOpen(false);
        }}
        theme="dark"
        minimumDate={new Date()}
      />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === "ios"
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: "Diet Dining Calendar" };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: "Diet Dining Calendar",
    color: Colors.primary,
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource as Calendar.Source,
    name: "internalCalendarName",
    ownerAccount: "personal",
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
    id: "DietDiningCalendar",
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  setItem("CALENDAR_ID", `${newCalendarID}`);
}

async function createReminder({
  title,
  notes,
  startDate,
}: {
  title: string;
  notes: string;
  startDate: Date | string;
}) {
  const CALENDAR_ID = getItem("CALENDAR_ID");
  const tomoro = day().add(1, "minute").toISOString();
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === "granted") {
    const Event_ID = await Calendar.createEventAsync(CALENDAR_ID as string, {
      notes,
      startDate,
      alarms: [{ relativeOffset: 0, method: Calendar.AlarmMethod.ALERT }],
      endDate: tomoro,
      title,
    });
    console.log(Event_ID);
  }
}

async function deleteCalendar(id: string) {
  await Calendar.deleteCalendarAsync(id);
  console.log("deleted");
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.lightBlack,
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    color: Colors.light,
    fontFamily: SEMI_BOLD,
    fontSize: 20,
  },
});
