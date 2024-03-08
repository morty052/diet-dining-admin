import { Pressable, StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useCameraPermission,
  useMicrophonePermission,
  useCameraDevice,
  Camera,
  PhotoFile,
  TakePhotoOptions,
  VideoFile,
  useCodeScanner,
  CameraDevice,
} from "react-native-vision-camera";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getImageurl, supabase } from "../../utils/supabase";

type Props = {};

const IdentifyMealScreen = (props: Props) => {
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera"],
  });

  const { hasPermission, requestPermission } = useCameraPermission();

  const [isActive, setIsActive] = React.useState(false);
  const [flash, setFlash] = React.useState<TakePhotoOptions["flash"]>("off");
  const [isRecording, setIsRecording] = React.useState(false);

  const [photo, setPhoto] = React.useState<PhotoFile>();
  const [video, setVideo] = React.useState<VideoFile>();

  const camera = React.useRef<Camera>(null);

  useFocusEffect(
    React.useCallback(() => {
      setIsActive(true);
      return () => {
        setIsActive(false);
      };
    }, [])
  );

  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const onTakePicturePressed = async () => {
    const photo = await camera.current?.takePhoto({
      flash,
    });
    setPhoto(photo);
    console.log(photo);
  };

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }

    const res = await fetch(`file://${photo.path}`);
    const arraybuffer = await res.arrayBuffer();
    const fileExt = photo.path?.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from("temp_images/public")
      .upload(path, arraybuffer, {
        contentType: "image/jpg",
      });

    const url = await getImageurl(data?.path);

    const geminiRes = await fetch(
      `https://c6a2-102-216-10-2.ngrok-free.app/send?url=${url}`
    );
    const geminidata = await geminiRes.json();
    console.log(geminidata);
  };

  if (!hasPermission) {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "red" }]}>
      {!photo && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: "red" }]}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device as CameraDevice}
            isActive={isActive}
            photo
            video
            audio
          />
          <Pressable
            onPress={onTakePicturePressed}
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 50,
              width: 75,
              height: 75,
              backgroundColor: isRecording ? "red" : "white",
              borderRadius: 75,
            }}
          />
        </View>
      )}

      {photo && (
        <>
          <Image
            source={{ uri: `file://${photo.path}` }}
            style={StyleSheet.absoluteFill}
          />
          <FontAwesome5
            onPress={() => setPhoto(undefined)}
            name="arrow-left"
            size={25}
            color="white"
            style={{ position: "absolute", top: 50, left: 30 }}
          />
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              backgroundColor: "rgba(0, 0, 0, 0.40)",
            }}
          >
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      )}
    </View>
  );
};

export default IdentifyMealScreen;

const styles = StyleSheet.create({});
