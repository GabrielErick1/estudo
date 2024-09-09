import { z } from "zod";

export const userSchema = z.object({
    email: z.string().email().optional(),
    username: z.string().min(1).optional(),
    password: z.string().min(1)
});

type IUser = z.infer<typeof userSchema>;