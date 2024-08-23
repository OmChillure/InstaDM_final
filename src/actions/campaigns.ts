"use server"

import z from "zod";
import { createCampaignSchema } from "../schemas/campaigns";
import db from "@/lib/db";

type connectAudienceListToCampaignType = {
  audienceListId:string
  campaignId:string
  userId:string
}

export const createCampaign = async ({
  title,
  description,
  messagesPerDay,
  workingHours,
}: z.infer<typeof createCampaignSchema>, userId: string) => {
  try {
    const campaign = await db.campaign.create({
      data:{
        title,
        description,
        messagesPerDay,
        workingHours,
        userId
      }
    })
    return campaign;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to create campaign")
  }
};


export const connectAudienceListToCampaign = async ({audienceListId,campaignId,userId}:connectAudienceListToCampaignType)  => {
  try {
    const campaign = await db.campaign.findUnique({
      where:{
        id: campaignId
      },
      include:{
        lists: true
      }
    })

    if(!campaign || campaign?.userId !== userId){
      throw new Error("Not allowed!!")
    }

    if(audienceListId && campaign.lists?.map((e)=>e?.id).includes(audienceListId)){
      throw new Error("List is already included in campaign!!")
    }

    await db.campaign.update({
      where:{id:campaignId},
      data:{
        lists:{
          connect:{
            id: audienceListId
          }
        }
      }
    })

    return campaign;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to add audience list to campaign")
  }
};