import { Button } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const description = `
# Local First app
With WatermelonDB
`;

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 22: Local First" }} />

      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day22/local" asChild>
        <Button title="Go to local Page" />
      </Link>
    </SafeAreaView>
  );
};

export default DayDetailsScreen;
