import { z } from "zod";

const options = [
  "CSV",
  "FOLLOWERS",
  "FOLLOWINGS",
  "LIKES",
  "JSON",
  "RAW",
] as const;
export const createAudienceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name must contain atleast 1 character")
    .max(300, "Name cannot be greater than 300 characters"),
  desc: z.string().optional(),
  userNames: z.string().array(),
  type: z.enum(options),
  parentUsernames: z.string().array(),
});
