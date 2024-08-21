"use server"

import z from "zod";
import { createCampaignSchema } from "../schemas/campaigns";
import db from "@/lib/db";

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

