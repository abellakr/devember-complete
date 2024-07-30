import { View, Text } from "react-native";
import { database } from "@components/day22/model";
import React, { useEffect, useState } from "react";
import Task from "@/components/day22/model/Task";
import NewTaskInput from "@/components/day22/NewTaskInput";

const LocalFirstApp = () => {
  const [tasks, setTasks] = useState<any>([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const allTasks = await database.get("tasks").query().fetch();
    setTasks(allTasks);
  };
  return (
    <View>
      <Text>LocalFirstApp</Text>

      {tasks.map((task: any) => (
        <Text>{task.title}</Text>
      ))}
      <NewTaskInput />
    </View>
  );
};

export default LocalFirstApp;
