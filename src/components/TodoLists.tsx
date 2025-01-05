"use client";

import React, { useEffect } from "react";
import TodoList from "./TodoList";
import useTaskStore from "@/store/useTaskStore";
import { Task } from "@/types/todo";
import Image from "next/image";

export default function TodoLists() {
  const { tasks, addTask } = useTaskStore();
  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("/api/todos");
      const data = await res.json();
      if (data.tasks) {
        data.tasks.forEach((task: Task) => addTask(task));
      }
    };

    fetchTasks();
  }, [addTask]);

  

  return (
    <>
      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-2 w-full h-full">
          {tasks.map((taskobj: Task) => (
            <TodoList key={taskobj?._id} taskobj={taskobj} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Image src="/undraw_empty.svg" alt="Empty" width={300} height={300} />
        </div>
      )}
    </>
  );
}
