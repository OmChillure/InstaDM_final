import { getNewTask, updateTask } from "@/actions/tasks";
import { NextResponse } from "next/server";

// get new taks -----------------------
export const GET = async (request: any) => {
  let success = false;
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const userId = searchParams.get("userId");

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const task = await getNewTask(userId);
    const success = true;

    return NextResponse.json({ success: success, data: task }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: success, error: err?.message },
      { status: 200 }
    );
  }
};


// update tasks status -----------------------
export const PATCH = async (request: any) => {
    let success = false;
    try {
        const { status, taskId } = await request.json();
  
      if (!taskId || !status) {
        throw new Error("Fields are missing");
      }
  
      const task = await updateTask(taskId, status);
      const success = true;
  
      return NextResponse.json({ success: success, data: task }, { status: 200 });
    } catch (err: any) {
      return NextResponse.json(
        { success: success, error: err?.message },
        { status: 200 }
      );
    }
  };