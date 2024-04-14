import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../../constants/colors";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInLeft,
  FadeOutLeft,
  SlideInDown,
  SlideInLeft,
  SlideOutDown,
  SlideOutLeft,
} from "react-native-reanimated";
import { TaskItemProps } from "../../../types/TaskItemProps";
import * as Linking from "expo-linking";

type AttachmentButtonsProps = {
  attachments: Partial<TaskItemProps["attachments"]>;
};
type DropDownProps = {
  type: "IMAGES" | "FILES" | "LINKS";
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  attachments: Partial<TaskItemProps["attachments"]>;
};

function LinksDropDown({
  links,
}: {
  links: { link: string; title: string }[] | undefined;
}) {
  async function openLink(link: string) {
    const hasHttp = link.includes("https://");
    if (hasHttp) {
      await Linking.openURL(link);
      return;
    }
    console.info("no http");
    const url = `https://${link}`;
    await Linking.openURL(url);
  }

  return (
    <View style={{ paddingTop: 10, gap: 10 }}>
      {links?.map((link, index) => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.light,
            borderRadius: 10,
            padding: 6,
          }}
          key={index}
        >
          <Text
            style={{ color: Colors.light, fontFamily: SEMI_BOLD, fontSize: 15 }}
            onPress={() => openLink(link.link)}
          >
            {link.title}
          </Text>
          <Ionicons name="chevron-forward" color={Colors.light} size={20} />
        </View>
      ))}
    </View>
  );
}

function FilesDropDown() {
  return (
    <View>
      <Text>Files</Text>
    </View>
  );
}
function ImagesDropDown() {
  return (
    <View>
      <Text>Images</Text>
    </View>
  );
}

function DropDown({ type, setOpen, attachments }: DropDownProps) {
  const DropDownTypes = React.useMemo(
    () => ({
      IMAGES: <ImagesDropDown />,
      FILES: <FilesDropDown />,
      LINKS: <LinksDropDown links={attachments?.links} />,
    }),
    [type]
  );

  return (
    <Animated.View
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      style={{
        height: 200,
        width: 300,
        backgroundColor: "rgb(151, 151, 151)",
        position: "absolute",
        bottom: -210,
        left: 0,
        zIndex: 50,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={{ textTransform: "capitalize", color: "white" }}>
          {type.toLowerCase()}
        </Text>
        <Pressable onPress={() => setOpen(false)}>
          <Ionicons color={"white"} size={30} name="close-circle" />
        </Pressable>
      </View>
      {DropDownTypes[type]}
    </Animated.View>
  );
}

function ImageAttachments({
  open,
  setOpen,
  setType,
  isAvailable,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<Partial<DropDownProps["type"]>>>;
  isAvailable: boolean;
}) {
  function handleOpen() {
    setType("IMAGES");
    setOpen(true);
  }
  return (
    <Pressable
      onPress={isAvailable ? handleOpen : null}
      style={[
        styles.attachmentContainer,
        { borderColor: isAvailable ? Colors.light : Colors.lightBlack },
      ]}
    >
      <Ionicons
        name="image"
        color={isAvailable ? Colors.light : Colors.lightBlack}
        size={30}
      />
    </Pressable>
  );
}
function FileAttachments({
  open,
  setOpen,
  setType,
  isAvailable,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<Partial<DropDownProps["type"]>>>;
  isAvailable: boolean;
}) {
  function handleOpen() {
    setType("FILES");
    setOpen(true);
  }
  return (
    <Pressable
      onPress={isAvailable ? handleOpen : null}
      style={[
        styles.attachmentContainer,
        { borderColor: isAvailable ? Colors.light : Colors.lightBlack },
      ]}
    >
      <Ionicons
        name="document"
        color={isAvailable ? Colors.light : Colors.lightBlack}
        size={30}
      />
    </Pressable>
  );
}

function URLAttachments({
  open,
  setOpen,
  setType,
  isAvailable,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setType: React.Dispatch<React.SetStateAction<Partial<DropDownProps["type"]>>>;
  isAvailable: boolean;
}) {
  function handleOpen() {
    setType("LINKS");
    setOpen(true);
  }

  return (
    <Pressable
      onPress={isAvailable ? handleOpen : null}
      style={[
        styles.attachmentContainer,
        { borderColor: isAvailable ? Colors.light : Colors.lightBlack },
      ]}
    >
      <Ionicons
        name="link"
        color={isAvailable ? Colors.light : Colors.lightBlack}
        size={30}
      />
    </Pressable>
  );
}

const AttachmentButtons = ({ attachments }: AttachmentButtonsProps) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] =
    React.useState<Partial<DropDownProps["type"]>>("IMAGES");

  if (!attachments) {
    return null;
  }

  return (
    <>
      <Text style={styles.titleText}>Attachments</Text>
      <View style={styles.allAttachmentsContainer}>
        <ImageAttachments
          isAvailable={attachments?.images ? true : false}
          setType={setType}
          open={open}
          setOpen={setOpen}
        />
        <FileAttachments
          isAvailable={attachments?.files ? true : false}
          setType={setType}
          open={open}
          setOpen={setOpen}
        />
        <URLAttachments
          isAvailable={attachments?.links ? true : false}
          setType={setType}
          open={open}
          setOpen={setOpen}
        />
        {open && (
          <DropDown attachments={attachments} setOpen={setOpen} type={type} />
        )}
      </View>
    </>
  );
};

export default AttachmentButtons;

const styles = StyleSheet.create({
  allAttachmentsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    zIndex: 50,
    position: "relative",
  },
  attachmentContainer: {
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: Colors.light,
    fontSize: 15,
    fontFamily: SEMI_BOLD,
    textAlign: "left",
  },
});
