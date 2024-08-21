import z from "zod";
import { createCampaignSchema } from "../schemas/campaigns";

const createCampaign = async ({
  title,
  description,
  messagesPerDay,
  workingHours,
}: z.infer<typeof createCampaignSchema>) => {
  try {
    // const campaign = await prisma
  } catch (error) {}
};

export default { createCampaign };
