import { View, Text, Button } from "react-native";
import * as Notifications from "expo-notifications";
import React from "react";

const NotificationsHomeScreen = () => {
  return (
    <View>
      <Text>Notifications</Text>

      <Button
        title="Schedule test notifications"
        onPress={schedulePushNotification}
      />
    </View>
  );
};

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check out the new tinder swipe animation!",
      body: "Here is the notification body",
      data: { data: "goes here", url: "/day14/notifications" },
    },
    trigger: { seconds: 5 },
  });
}

export default NotificationsHomeScreen;
