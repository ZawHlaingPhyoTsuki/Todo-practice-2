// import { NextRequest, NextResponse } from "next/server";
// import { Todo } from "@/types/todo";

// const todos: Todo[] = Array.from({ length: 100 }, (_, i) => ({
//   id: i + 1,
//   title: `Todo #${i + 1}`,
//   completed: i % 2 === 0,
// }));

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "10");

//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + limit;

//   const paginatedTodos = todos.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(todos.length / limit);

//   return NextResponse.json({
//     todos: paginatedTodos,
//     totalPages,
//     currentPage: page,
//   });
// }
