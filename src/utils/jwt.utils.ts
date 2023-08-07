import { readFile } from 'fs/promises'
import jwt from 'jsonwebtoken'
import path from 'path'
import config from 'config'
import { JWTPayload } from '../types'
export const signJWT = async (object: Object, options?: jwt.SignOptions) => {
  return jwt.sign(object, config.get<string>('privateKey'), {
    ...options,
    algorithm: 'RS256',
  })
}
export const verifyJwt = async (token: string) => {
  const PUBLIC_KEY = await readFile(path.resolve('./config/private.pem'), 'utf-8')
  try {
    const decoded = (await jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })) as JWTPayload
    return { decoded, expired: false, valid: true }
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    }
  }
}
