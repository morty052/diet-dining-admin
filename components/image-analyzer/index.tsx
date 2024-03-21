import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getImageurl, supabase } from "../../utils/supabase";
import { baseUrl } from "../../constants/baseUrl";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screen } from "../screen";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import BackButton from "../ui/BackButton";
import * as ImagePicker from "expo-image-picker";

type Props = {};

const Stack = createNativeStackNavigator();

const IdentifyMealWithCamScreen = (props: Props) => {
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera"],
  });

  const { hasPermission, requestPermission } = useCameraPermission();

  const [isActive, setIsActive] = React.useState(false);
  const [flash, setFlash] = React.useState<TakePhotoOptions["flash"]>("off");
  const [isRecording, setIsRecording] = React.useState(false);

  const [photo, setPhoto] = React.useState<PhotoFile>();
  const [video, setVideo] = React.useState<VideoFile>();

  const [breakDown, setBreakDown] = React.useState<null | string>(null);

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

    const geminiRes = await fetch(`${baseUrl}/meal?url=${url}`);
    const geminidata = await geminiRes.json();
    console.log(geminidata);
    setBreakDown(geminidata.data);
  };

  if (!hasPermission) {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: "red" }]}>
      {!photo && !breakDown && (
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

      {photo && !breakDown && (
        <>
          <Image
            source={{ uri: `file://${photo.path}` }}
            style={StyleSheet.absoluteFill}
          />
          <Ionicons
            onPress={() => setPhoto(undefined)}
            name="arrow-back"
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
      {breakDown && breakDown?.ingredients.map((i) => <Text>{i}</Text>)}
    </View>
  );
};

const UploadMealScreen = () => {
  const [preview, setPreview] = React.useState<null | string>(null);
  const [photo, setPhoto] = React.useState<null | any>(null);
  const [loading, setLoading] = React.useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPreview(result.assets[0].uri);
      setPhoto(result.assets[0]);
    }
  };

  const uploadPhoto = async () => {
    if (!photo) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${photo.uri}`);
      const arraybuffer = await res.arrayBuffer();
      const fileExt = photo.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("temp_images/public")
        .upload(path, arraybuffer, {
          contentType: "image/jpg",
        });

      const url = await getImageurl(data?.path);

      const geminiRes = await fetch(`${baseUrl}/meal?url=${url}`);
      const geminidata = await geminiRes.json();
      console.log(geminidata);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    // setBreakDown(geminidata.data);
  };

  return (
    <Screen>
      {!preview && (
        <View style={{ flex: 1, alignItems: "center", paddingTop: 150 }}>
          <Pressable style={{ alignItems: "center" }} onPress={pickImage}>
            <Ionicons name="image-outline" size={100} color={Colors.light} />
            <Text style={{ color: Colors.light, fontSize: 25 }}>
              Tap to open gallery
            </Text>
          </Pressable>
        </View>
      )}
      {preview && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            style={{ height: 300, width: 300, alignSelf: "center" }}
            source={{ uri: preview }}
          />
          <Pressable
            onPress={uploadPhoto}
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.light,
              width: "95%",
              height: 50,
              borderRadius: 10,
              marginBottom: 50,
            }}
          >
            {!loading && (
              <Text style={{ color: "black", fontSize: 20 }}>Analyse</Text>
            )}
            {loading && <ActivityIndicator size={"large"} color={"black"} />}
          </Pressable>
        </View>
      )}
    </Screen>
  );
};

const PickIDTypeScreen = () => {
  const navigation = useNavigation();
  return (
    <Screen>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: SEMI_BOLD,
            fontSize: 20,
            marginTop: 10,
          }}
        >
          Select method to analyse meal
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            paddingTop: 40,
          }}
        >
          {/* @ts-ignore */}
          <Pressable onPress={() => navigation.navigate("cam")}>
            <Ionicons color={Colors.light} size={100} name="camera-outline" />
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Take Photo
            </Text>
          </Pressable>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 25,
              fontFamily: SEMI_BOLD,
            }}
          >
            OR
          </Text>
          <Pressable
            // @ts-ignore
            onPress={() => navigation.navigate("upload")}
            style={{ alignItems: "center" }}
          >
            <Ionicons
              color={Colors.light}
              size={100}
              name="cloud-upload-outline"
            />
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Upload image to cloud
            </Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
};

const IdentifyMealScreen = (props: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="pick"
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.darkGrey },
      }}
    >
      <Stack.Screen name="pick" component={PickIDTypeScreen} />
      <Stack.Screen name="cam" component={IdentifyMealWithCamScreen} />
      <Stack.Screen name="upload" component={UploadMealScreen} />
    </Stack.Navigator>
  );
};

export default IdentifyMealScreen;

const styles = StyleSheet.create({});
