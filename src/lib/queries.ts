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

export const getAllAudienceLists = async (userId: string) => {
  try {
    const lists = await db.audienceList.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return lists;
  } catch (error) {
    throw new Error("Could not fetch audience lists")
  }
};
