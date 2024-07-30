import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { type Task } from "@/components/day16/TasksContextProvider";
import { useTasks } from "./TasksContextProvider";

type NewTaskInput = {};

const NewTaskInput = ({}: NewTaskInput) => {
  const { addTask } = useTasks();
  const [newTask, setNewTask] = useState("");

  return (
    <View style={styles.taskContainer}>
      <MaterialCommunityIcons
        name={"checkbox-blank-circle-outline"}
        size={24}
        color={"black"}
      />
      <TextInput
        value={newTask}
        onChangeText={setNewTask}
        style={styles.input}
        placeholder="Todo..."
        onEndEditing={() => {
          if (!newTask) return;
          addTask(newTask);
          setNewTask("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    fontFamily: "InterSemi",
    fontSize: 15,
    color: "dimgray",
    flex: 1,
  },
});

export default NewTaskInput;
