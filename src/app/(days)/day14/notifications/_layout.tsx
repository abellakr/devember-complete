import { Alert, Platform, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Slot, router } from "expo-router";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const AppWithNotificationsLayout = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    let isMounted = true;

    //fetch expo push token
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification recieved");
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        redirect(response.notification);
        console.log("Added notification listener");
      });

      //checks if the app is in the background (or not mounted), once it is mounted, automatically redirect to the last 
      //notification's redirect url
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      redirect(response?.notification);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
      isMounted = false;
    };
  }, []);

  function redirect(notification: Notifications.Notification) {
    const url = notification.request.content.data?.url;
    if (url) {
      router.push(url);
    }
  }

  console.log("Token :", expoPushToken);
  console.log(notification);

  return (
    <>
      <Slot />
      {expoPushToken && (
        <Text
          style={{ position: "absolute", bottom: 100, backgroundColor: "red" }}
        >
          {expoPushToken}
        </Text>
      )}
      {notification && (
        <View
          style={{
            position: "absolute",
            bottom: 30,
            left: 10,
            right: 10,
            justifyContent: "center",
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontFamily: "InterBold" }}>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
          <AntDesign
            style={{ position: "absolute", top: 10, right: 10 }}
            name={"close"}
            size={24}
            color="black"
            onPress={() => setNotification(undefined)}
          />
        </View>
      )}
    </>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid

    if (!Constants.expoConfig?.extra?.eas.projectId) {
      Alert.alert("No project ID found in app.json");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export default AppWithNotificationsLayout;
