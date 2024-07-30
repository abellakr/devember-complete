import {
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import NewTaskInput from "@/components/day17/NewTaskInput";
import TaskListItem from "@/components/day17/TaskListItem";
import { useHeaderHeight } from "@react-navigation/elements";

import React, { useState } from "react";
import { useTasksStore } from "@/components/day17/TasksStore";

const TodoScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [tab, setTab] = useState<"All" | "Todo" | "Finished">("All");

  const headerHeight = useHeaderHeight();

  const numberOfCompletedTasks = useTasksStore((state: any) =>
    state.numberOfCompletedTasks()
  );

  const numberOfTasks = useTasksStore((state: any) => state.numberOfTasks());

  const getFileteredTasks = useTasksStore(
    (state: any) => state.getFileteredTasks
  );

  const filteredTasks = getFileteredTasks(tab, searchQuery);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Todo (Zustand)",
          headerBackTitleVisible: false,
          headerRight: () => (
            <Text style={{ fontFamily: "InterBold", color: "dimgray" }}>
              {numberOfCompletedTasks} / {numberOfTasks}
            </Text>
          ),
          headerSearchBarOptions: {
            hideWhenScrolling: true,
            onChangeText: (e) => setSearchQuery(e.nativeEvent.text),
          },
        }}
      />
      <SafeAreaView
        edges={["bottom"]}
        style={{ flex: 1, paddingTop: headerHeight + 35 }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-around",
          }}
        >
          <Button title="All" onPress={() => setTab("All")} />
          <Button title="Todo" onPress={() => setTab("Todo")} />
          <Button title="Finished" onPress={() => setTab("Finished")} />
        </View>
        <FlatList
          data={filteredTasks}
          contentContainerStyle={{ gap: 5, padding: 10 }}
          renderItem={({ item }) => <TaskListItem task={item} />}
          ListFooterComponent={() => <NewTaskInput />}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default TodoScreen;
