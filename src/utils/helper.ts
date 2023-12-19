import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { CustomRouteFunction, MyRequest } from '../types'
// eslint-disable-next-line import/no-unresolved
import * as core from 'express-serve-static-core'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as qs from 'qs'
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/ban-types
type basicFun<P extends core.ParamsDictionary = {}, Q extends qs.ParsedQs = {}> = (
  req: Request<P, any, any, Q>,
  res: Response<any>,
  next: NextFunction
) => any
export function customRouteFunction<
  B = unknown,
  P extends core.ParamsDictionary = Record<string, any>,
  Q extends qs.ParsedQs = Record<string, any>,
>(fn: CustomRouteFunction<B, P, Q>): basicFun<P, Q> {
  return (req, res, next) => {
    fn(req as MyRequest<B, P, Q>, res, next).catch(next)
  }
}
export const runService = async <T>(fn: (...args: any[]) => T, msg?: string): Promise<T | void> => {
  try {
    return fn()
  } catch (error) {
    throw createHttpError(500, msg ?? 'internal server Error', { cause: error })
  }
}
