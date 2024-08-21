import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title must contain atleast 1 character")
    .max(300, "Title cannot be greater than 300 characters"),
  description: z.string().optional(),
  workingHours: z.number().array().length(2,"Working hour Range is invalid"),
  messagesPerDay: z.number().array().length(2,"Messages Per Day Range is invalid")
});
