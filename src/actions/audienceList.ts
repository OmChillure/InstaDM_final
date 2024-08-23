"use server";

import z from "zod";
import db from "@/lib/db";
import { createAudienceSchema } from "@/schemas/audience";
import { AudienceList } from "@prisma/client";

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
    return audienceList;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create audience list");
  }
};
