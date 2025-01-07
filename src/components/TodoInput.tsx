"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useTaskStore from "@/store/useTaskStore";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/todo";
import { useRouter } from "next/navigation";

export default function TodoInput() {
  const [newTask, setNewTask] = useState("");
  const { addTask } = useTaskStore();
  const { toast } = useToast();
  const router = useRouter();

  // Handle input change
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  // Handle adding a new task
  const handleAddTask = async () => {
    if (!newTask) {
      toast({
        title: "Empty Task",
        description: "Please add a task",
        variant: "destructive",
      });
      return;
    }

    try {
      // Send a POST request to the API
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      const data = await res.json();
      const task: Task = {
        _id: data.newTask._id,
        title: data.newTask.title,
        completed: data.newTask.completed,
      };

      // Update the local state
      addTask(task);

      // Reset input field
      setNewTask("");

      // Refresh the page
      router.refresh();

      // Show success toast
      toast({
        title: "Task Added",
        description: "Task added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full px-1">
      <Label htmlFor="new-task">New Task</Label>
      <div className="flex gap-4">
        <Input
          id="new-task"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleOnChange}
        />
        <Button className="font-bold" onClick={handleAddTask}>
          Add Task
        </Button>
      </div>
    </div>
  );
}
