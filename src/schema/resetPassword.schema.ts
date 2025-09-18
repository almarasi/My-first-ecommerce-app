import z from "zod";

export const resetPassSchema = z.object({
  email: z.string().email("Invalid email address"),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

export type resetPassSchemaType = z.infer<typeof resetPassSchema>;
