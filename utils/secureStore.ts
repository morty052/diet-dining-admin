import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  console.info("saved", key);
}

export async function deleteKey(key: string) {
  await SecureStore.deleteItemAsync(key);
  console.log("DELETED", key);
}

export async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return false;
  }
}
