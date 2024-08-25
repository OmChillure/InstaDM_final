"use server";

import z from "zod";
import db from "@/lib/db";
import { createAudienceSchema } from "@/schemas/audience";
import { AudienceList } from "@prisma/client";
import { createTasks } from "./tasks";

export const createAudienceList = async (
  {
    name,
    desc,
    parentUsernames,
    userNames,
    type,
  }: z.infer<typeof createAudienceSchema>,
  userId: string,
  campaignId?: string,
) => {
  try {
    let audienceList: AudienceList;

    if (campaignId) {
      const campaign = await db.campaign.findUnique({
        where: { id: campaignId },
      });

      if (!campaign) {
        throw new Error("Campaign not found!!!");
      }

      audienceList = await db.audienceList.create({
        data: {
          name,
          desc,
          parentUsernames,
          userNames,
          type,
          userId,
          campaigns: {
            connect: {
              id: campaignId,
            },
          },
        },
      });
    } else {
      audienceList = await db.audienceList.create({
        data: {
          name,
          desc,
          parentUsernames,
          userNames,
          type,
          userId
        },
      });
    }

    // create a new task to it -----------
    if(["FOLLOWERS","FOLLOWINGS","LIKES"].includes(type)){
      await createTasks({
        type: type === "FOLLOWERS" ? "GET_FOLLOWERS" : type === "FOLLOWINGS" ? "GET_FOLLOWINGS" :  "GET_LIKES",
        listId: audienceList?.id
      },userId)
    }

    return audienceList;
  } catch (error:any) {
    console.log(error);
    throw new Error(error?.message ?? "Failed to create audience list");
  }
};

export const addUsersInList = async (
  listId:string,
  userNames: string[]
) => {
  try {
    const list = await db.audienceList.findUnique({
      where:{
        id:listId
      }
    })

    if(!list){
      throw new Error("List not found!!!")
    }

    const foundData = [...userNames, ...list?.userNames?.filter((e)=>userNames?.some((usr)=>(usr !== e)))]

    await db.audienceList.update({
      where:{
        id: listId
      },
      data:{
        userNames: foundData
      }
    })

    return list;
  } catch (error:any) {
    console.log(error);
    throw new Error(error?.message ?? "Failed to update audience list");
  }
};