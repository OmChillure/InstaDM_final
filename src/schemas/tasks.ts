import { z } from "zod";

const options = [
    "GET_FOLLOWERS",
    "GET_FOLLOWINGS",
    "START_CAMPAIGNING",
    "GET_LIKES",
  ] as const;

export const createTasksSchema = z.object({
  type: z.enum(options),
  listId: z.string().optional(),
  campaignId: z.string().optional(),
});
