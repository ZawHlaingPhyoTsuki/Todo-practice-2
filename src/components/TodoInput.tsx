"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useTaskStore from "@/store/useTaskStore";
import { useToast } from "@/hooks/use-toast";
import { Task } from "@/types/todo";

export default function TodoInput() {
  const [newTask, setNewTask] = useState("");
  const { addTask } = useTaskStore();
  const { toast } = useToast();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (!newTask) {
      toast({
        title: "Empty Task",
        description: "Please add a task",
        variant: "destructive",
      });
      return;
    }
    const task : Task = { id: Date.now(), task: newTask, completed: false };
    addTask(task);
    setNewTask("");
    toast({
      title: "Task Added",
      description: "Task added successfully",
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full px-1">
      <Label htmlFor="new-task">New Task</Label>
      <div className="flex  gap-4">
        <Input
          id="new-task"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleOnChange}
        />
        <Button className="font-bold" onClick={handleAddTask}>Add Task</Button>
      </div>
    </div>
  );
}
