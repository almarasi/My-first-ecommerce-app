import z from "zod";

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters long and no spaces").max(30, "Name must be at most 30 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),
    rePassword: z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type registerSchemaType = z.infer<typeof registerSchema>;
