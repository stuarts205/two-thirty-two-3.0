import {z} from 'zod';

export const slideInsertSchema = z.object({
    description: z.string().optional(),
    people: z.string().optional(),
    approxDate: z.string().optional(),
})

export const slideUpdateSchema = slideInsertSchema.extend({
    slidename: z.string().min(1,  {message: 'ID is required'}),
})