import { addUsersInList } from "@/actions/audienceList";
import { NextResponse } from "next/server";

// add users to list status -----------------------
export const PATCH = async (request: any) => {
    let success = false;
    try {
        const { listId, userNames } = await request.json();
  
      if (!listId || !userNames) {
        throw new Error("Fields are missing");
      }
  
      const task = await addUsersInList(listId, userNames);
      const success = true;
  
      return NextResponse.json({ success: success, data: task }, { status: 200 });
    } catch (err: any) {
      return NextResponse.json(
        { success: success, error: err?.message },
        { status: 200 }
      );
    }
  };