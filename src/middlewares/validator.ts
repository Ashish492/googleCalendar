import { NextFunction, Request, Response } from 'express'
import z, { AnyZodObject, ZodEffects, ZodError, ZodTypeAny } from 'zod'
export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (e: any) {
    if (e instanceof ZodError) {
      return res.status(500).json(e.errors)
    }
  }
}
export function bodyValidator(schema: AnyZodObject | ZodEffects<ZodTypeAny>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}
export function getValidateObject(
  params: AnyZodObject | null = null,
  body: AnyZodObject | null = null,
  query: AnyZodObject | null = null
) {
  let validateObject = z.object({})
  if (body) {
    validateObject = validateObject.extend({
      body,
    })
  }
  if (query) {
    validateObject = validateObject.extend({
      query,
    })
  }
  if (params) {
    validateObject = validateObject.extend({
      params,
    })
  }
  return validateObject
}
