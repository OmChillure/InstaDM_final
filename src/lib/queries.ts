"use server";

import db from "./db";

export const getAllCampaigns = async (userId: string) => {
  try {
    const campaigns = await db.campaign.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return campaigns;
  } catch (error) {
    throw new Error("Could not fetch campaigns")
  }
};
