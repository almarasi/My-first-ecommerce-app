import z from "zod";

export const ResetCodeSchema = z.object({
    resetCode: z.string().nonempty("reset code cant be empty")
});

export type ResetCodeSchemaType = z.infer<typeof ResetCodeSchema>;
