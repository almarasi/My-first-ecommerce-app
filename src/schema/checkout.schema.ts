import z from "zod";

export const CheckoutSchema = z.object({
  details: z.string().nonempty("cant be empty"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().nonempty("cant be empty"),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
