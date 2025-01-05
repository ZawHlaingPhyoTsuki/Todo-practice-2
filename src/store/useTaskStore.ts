import { TaskStore } from "@/types/todo";
import { create } from "zustand";

const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    { id: 1, task: "Finish JavaScript Cash Register App", completed: true },
    { id: 2, task: "Study for 'Creative Thinking' Class Exam", completed: false },
    { id: 3, task: "Set Up VirtualBox for Arch Linux", completed: false },
    {
      id: 4,
      task: "Research Marketing Strategies for Cybercafe",
      completed: false,
    },
    {
      id: 5,
      task: "Work on Pokémon Search App (freeCodeCamp Project)",
      completed: false,
    },
  ],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  removeTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  doneTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  // updateTask: (id, task) =>
  //   set((state) => ({
  //     tasks: state.tasks.map((task) =>
  //       task.id === id ? { ...task, task: task } : task
  //     ),
  //   })),
  updateTask: (id, newTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, task: newTask } : task
      ),
    })),
}));

export default useTaskStore;
