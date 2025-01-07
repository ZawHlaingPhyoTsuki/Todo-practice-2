// "use client";

// import React, { useEffect, useState } from "react";
// import TodoList from "./TodoList";
// import useTaskStore from "@/store/useTaskStore";
// import { Task } from "@/types/todo";
// import Image from "next/image";

// export default function TodoLists() {
//   const { tasks, addTask } = useTaskStore();
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch tasks from the API - CLIENT SIDE FETCHING
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const res = await fetch("/api/todos");
//         const data = await res.json();
//         if (data.tasks) {
//           data.tasks.forEach((task: Task) => addTask(task));
//         }
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       } finally {
//         setLoading(false); // Stop loading once fetching is done
//       }
//     };

//     fetchTasks();
//   }, [addTask]);

//   // Show a loading spinner while tasks are being fetched
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center w-full h-full">
//         Loading ...
//       </div>
//     );
//   }

//   return (
//     <>
//       {tasks.length > 0 ? (
//         <ul className="flex flex-col gap-2 w-full h-full">
//           {tasks.map((taskobj: Task) => (
//             <TodoList key={taskobj?._id} taskobj={taskobj} />
//           ))}
//         </ul>
//       ) : (
//         <div className="flex justify-center items-center w-full h-full">
//           <Image src="/undraw_empty.svg" alt="Empty" width={300} height={300} />
//         </div>
//       )}
//     </>
//   );
// }

////////////////////////

// "use client";

import TodoList from "@/components/TodoList";
import { Task } from "@/types/todo";

export default async function TodoLists() {
  // Fetch the data directly
  const response = await fetch("http://localhost:3000/api/todos", {
    cache: "no-store", // Ensures fresh data on each request
  });

  let tasks: Task[] = [];

  if (response.ok) {
    const data = await response.json();
    tasks = data.tasks;
  }

  return (
    <>
      {tasks.length > 0 ? (
        <ul className="flex flex-col gap-2 w-full h-full">
          {tasks.map((task) => (
            <TodoList key={task._id} taskobj={task} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>No tasks found.</p>
        </div>
      )}
    </>
  );
}
