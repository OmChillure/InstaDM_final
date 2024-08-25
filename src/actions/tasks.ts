"use server";

import z from "zod";
import db from "@/lib/db";
import { createTasksSchema } from "@/schemas/tasks";
import { Tasks } from "@prisma/client";

export const createTasks = async (
  { type, campaignId, listId }: z.infer<typeof createTasksSchema>,
  userId: string
) => {
  try {
    let task: Tasks | null = null;

    // check the values -------
    switch (type) {
      case "START_CAMPAIGNING":
        if (!campaignId) {
          throw new Error("Campaign not found");
        }
        const campaign = await db.campaign.findUnique({
          where: {
            id: campaignId,
          },
          include: {
            task: true,
          },
        });

        if (!campaign) {
          throw new Error("Campaign not found");
        }

        if (
          campaign?.status !== "REJECTED" &&
          campaign?.status !== "CREATED" &&
          campaign?.task
        ) {
          throw new Error("Campaign is already launched");
        }

        task = await db.tasks.create({
            data:{
                type,
                campaignId,
                userId
            },
        })

        break;

      case "GET_FOLLOWERS":
      case "GET_FOLLOWINGS":
      case "GET_LIKES":
        if (!listId) {
          throw new Error("List not found");
        }
        const list = await db.audienceList.findUnique({
          where: {
            id: listId,
          },
          include: {
            task: true,
          },
        });

        if (!list) {
          throw new Error("List not found");
        }

        if (list?.task) {
          throw new Error("List is already in process to be updated");
        }

        task = await db.tasks.create({
            data:{
                type,
                listId,
                userId
            },
        })

        break;

      default:
        break;
    }

    return task;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to schedule task to extension");
  }
};

export const getNewTask = async (userId:string) => {
    try {
        let task = await db.tasks.findFirst({
            where:{
                userId,
                status:"PENDING"
            }
        })

        if(task){
            throw new Error("Already alloted a task")
        }

        task = await db.tasks.findFirst({
            where:{
                userId,
                status:"NOT_STARTED"
            },
            include:{
                list:true,
                campaign:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })

        return task;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch new task");
    }
}

export const updateTask = async (taskId:string, status: "PENDING" | "COMPLETED") => {
  try {
      let task = await db.tasks.findUnique({
          where:{
            id:taskId
          }
      })

      if(!task || task?.status === "COMPLETED" ){
          throw new Error("Invalid task")
      }

      task = await db.tasks.update({
          where:{
            id: taskId
          },
         data:{
          status: status
         }
      })

      return task;
  } catch (error) {
      console.log(error);
      throw new Error("Failed to update the task");
  }
}