import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Todo from "@/models/Todo";

// GET: Fetch all tasks
export async function GET() {
  await dbConnect();

  try {
    const tasks = await Todo.find({});
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// POST: Add a new task
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { task } = await req.json();
    if (!task) {
      return NextResponse.json({ error: "Task is required" }, { status: 400 });
    }

    const newTask = new Todo({ title: task });
    await newTask.save();

    return NextResponse.json({ message: "Task added successfully", newTask });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add task" }, { status: 500 });
  }
}

// DELETE: Remove a task

export async function DELETE(req: NextRequest) {
  await dbConnect();

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task removed successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to remove task" },
      { status: 500 }
    );
  }
}

// PATCH: Update task completion status or editing task title
export async function PATCH(req: NextRequest) {
  await dbConnect();

  try {
    const { id, completed, title } = await req.json();

    if (!id || (completed === undefined && !title)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(completed !== undefined && { completed }),
      },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Failed to update task", details: err.message },
      { status: 500 }
    );
  }
}

