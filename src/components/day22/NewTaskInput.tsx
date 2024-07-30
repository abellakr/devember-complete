import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { database } from "./model";
import { writer } from "@nozbe/watermelondb/decorators";
import Task from "./model/Task";

type NewTaskInput = {};

const NewTaskInput = ({}: NewTaskInput) => {
  //   const addTask = useTasksStore((state: any) => state.addTask);
  const [newTask, setNewTask] = useState("");

  const addTask = async (title: string) => {
    await database.write(async () => {
      const newTask = await database.get("tasks").create((task) => {
        task.title = title;
        task.isFinished = false;
      });
    });
  };

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
