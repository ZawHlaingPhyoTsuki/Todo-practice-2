import { TaskStore } from "@/types/todo";
import { create } from "zustand";

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })), 
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== id),
    })),
  doneTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  updateTask: (id, updatedTitle) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task._id === id ? { ...task, title: updatedTitle } : task
      ),
    })),
}));

export default useTaskStore;
