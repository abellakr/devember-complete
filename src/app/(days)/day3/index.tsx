import { View, Text, Button } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import MarkdownDisplay from "@/components/day3/MarkdownDisplay";
import { SafeAreaView } from "react-native-safe-area-context";

const description = `
# Markdown

Intergrate Markdown content in **React Native**

📚 Todays Agenda: 
- Introduction to Markdown
- Markdown Syntax Overview
- Setting up React Native for Markdown
- Implementing markdown rendering
- Styling Markdown content
- Using Markdown in React Native components
- Recap and Q&A session
`;

const EditorScreen = () => {
  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Day 3: Markdown" }} />
      <MarkdownDisplay>{description}</MarkdownDisplay>

      <Link href="/day3/editor" asChild>
        <Button title={"Go to editor"} />
      </Link>
    </SafeAreaView>
  );
};

export default EditorScreen;
