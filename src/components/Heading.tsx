
import { Task } from '@/types/todo';
import React from 'react'

export default async function Heading() {
  
  const response = await fetch("http://localhost:3000/api/todos", {
      cache: "no-store", // Ensures fresh data on each request
    });
  
    let tasks: Task[] = [];
  
    if (response.ok) {
      const data = await response.json();
      tasks = data.tasks;
    }

  return (
    <h1 className="text-2xl font-bold mx-auto">
      All Tasks (Total {tasks.length}, Done{" "}
      {tasks.filter((el) => el.completed).length})
    </h1>
  );
}
