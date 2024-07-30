import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dummyTasks from "./dummyTasks";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Task = {
  id: string;
  title: string;
  isFinished: boolean;
};

type TasksStore = {
  tasks: Task[];
  addTask: (title: string) => void;

  changeIsFinished: (id: string) => void;
  deleteTask: (id: string) => void;

  getFileteredTasks: (tab: string, searchQuery: string) => Task[];
  numberOfCompletedTasks: () => number;
  numberOfTasks: () => number;
};

export const useTasksStore = create(
  persist<TasksStore>(
    (set, get) => ({
      tasks: dummyTasks,
      numberOfCompletedTasks: () =>
        get((state) => state.tasks).tasks.filter((t: Task) => t.isFinished)
          .length,
      numberOfTasks: () => get((state) => state.tasks).tasks.length,
      addTask: (title: string) => {
        const newTask: Task = {
          id: uuidv4(),
          title,
          isFinished: false,
        };
        set((state: any) => ({ tasks: [...state.tasks, newTask] }));
      },
      deleteTask: (id: string) => {
        set((state: any) => ({
          tasks: state.tasks.filter((t: Task) => t.id !== id),
        }));
      },
      changeIsFinished: (id: string) => {
        set((state: any) => ({
          tasks: state.tasks.map((task: Task) =>
            task.id !== id ? task : { ...task, isFinished: !task.isFinished }
          ),
        }));
      },
      getFileteredTasks: (tab: string, searchQuery: string) => {
        console.log(tab, searchQuery);
        const tasks = get((state: any) => state.tasks).tasks;
        return tasks.filter((task: Task) => {
          if (task.isFinished && tab === "Todo") {
            return false;
          }
          if (!task.isFinished && tab === "Finished") {
            return false;
          }
          if (!searchQuery) {
            return true;
          }
          return task.title
            .toLowerCase()
            .trim()
            .includes(searchQuery.toLowerCase().trim());
        });
      },
    }),
    {
      name: "tasks-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// export const useTasksStore = create<TasksStore>();
