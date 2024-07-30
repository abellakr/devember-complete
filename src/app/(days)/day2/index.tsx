import { View, Text, Button } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

const DayDetailScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: "Day 2: Onboarding" }} />
      <Text style={{ fontFamily: "AmaticBold", fontSize: 100 }}>
        Day 2 Details Screen
      </Text>

      <Link href="/day2/onboarding" asChild>
        <Button title={"Go to onboarding"} />
      </Link>
    </View>
  );
};

export default DayDetailScreen;
