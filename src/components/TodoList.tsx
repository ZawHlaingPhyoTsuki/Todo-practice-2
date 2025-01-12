'use client';

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import useTaskStore from "@/store/useTaskStore";
import { Task } from "@/types/todo";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

export default function TodoList({ taskobj }: { taskobj: Task }) {
  const { title, _id, completed } = taskobj;
  const { removeTask, doneTask, addTask, updateTask } = useTaskStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(title);
  const router = useRouter()

  const handleRemoveTask = async () => {
    try {
      const res = await fetch(`/api/todos?id=${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove task");
      }

      removeTask(_id);

      // refresh the page
      router.refresh()

      toast({
        title: "Task removed",
        description: "Task removed successfully",
        action: (
          <ToastAction altText="Undo" onClick={() => addTask(taskobj)}>
            Undo
          </ToastAction>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove task",
        variant: "destructive",
      });
    }
  };


  const handleDoneTask = async () => {
    try {
      const res = await fetch(`/api/todos`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id, completed: !completed }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      doneTask(_id);

      // refresh the page
      router.refresh()

      toast({
        title: "Task updated",
        description: "Task completion status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async () => {
    try {
      const res = await fetch(`/api/todos`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: _id, title: updatedTask }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const { task }: { task: Task } = await res.json(); // Get the updated task from the response

      updateTask(task._id, task.title); // Update the local store with the new task

      // refresh the page
      router.refresh()

      setIsEditing(false);
      toast({
        title: "Task updated",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  };


  return (
    <li
      className={`flex items-center justify-between w-full px-4 py-2 rounded-md shadow-md gap-3  ${
        completed
          ? "bg-gray-200 text-gray-500 dark:bg-slate-950 opacity-75 scale-95 transition-all duration-[1.5s] ease-out"
          : "bg-white dark:bg-slate-900 transition-all duration-[1.5s] ease-in hover:scale-105"
      }`}
    >
      <div className="flex items-center gap-2 w-full">
        <Checkbox checked={completed} onClick={handleDoneTask} />
        {isEditing ? (
          <Input
            className="my-2"
            defaultValue={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
        ) : (
          <h4
            className={`text-sm line-clamp-2  ${
              completed ? "" : " hover:line-clamp-none "
            }`}
          >
            {title}
          </h4>
        )}
      </div>
      {isEditing ? (
        <Button size={"sm"} onClick={handleUpdateTask}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setIsEditing(!isEditing)}
            disabled={completed}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Button>
          <Button
            className="hover:bg-slate-300/50"
            variant={"secondary"}
            size={"sm"}
            onClick={handleRemoveTask}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </Button>
        </div>
      )}
    </li>
  );
}
