import z, { object, string } from 'zod'
export const CalenderSchema = object({
  summary: string({ required_error: 'title required' }),
  description: string({ required_error: 'description is required' }),
  timeZone: string().optional().default('Asia/Kathmandu'),
})
export type CalenderInsertDto = z.infer<typeof CalenderSchema>
