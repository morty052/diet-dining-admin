import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import RestaurantScreen from "./tt";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const PreviewStoreScreen = ({ route }) => {
  const [loading, setLoading] = React.useState(true);
  const [synced, setSynced] = React.useState(false);
  const [Store, setStore] = React.useState(null);
  const [storePreview, setStorePreview] = React.useState({
    store_name: "",
    tags: ["western", "halal"],
  });
  const { socket } = useSocketContext();
  const { _id } = route.params;

  console.log(_id);

  React.useEffect(() => {
    socket?.emit("connect_companion", { _id }, () => {
      setLoading(false);
    });
  }, [socket]);

  React.useEffect(() => {
    socket?.on("synced", (data) => {
      // setLoading(true);
      console.log(data);
    });
    socket?.on("store_name_received", (data) => {
      console.log(data);
      setStorePreview((prev) => ({
        ...prev,
        store_name: data.store_name,
      }));
    });
    socket?.on("store_tag_received", (tag) => {
      console.log("tag received ", tag);
      setStorePreview((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    });
  }, [socket]);

  const handleSync = () => {
    socket?.emit("sync", { _id }, (data) => {
      console.info(data[0]);
      setSynced(true);
      setStore(data[0]);
    });
  };

  if (loading) {
    return null;
  }

  if (!synced) {
    return (
      <SafeAreaView>
        <Text className="mt-20" onPress={handleSync}>
          Sync
        </Text>
      </SafeAreaView>
    );
  }

  return <RestaurantScreen storePreview={storePreview} store={Store} />;
};

export default PreviewStoreScreen;

const styles = StyleSheet.create({});
