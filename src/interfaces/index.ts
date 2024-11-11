import type { Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

export type FormDataValues = {
  [key: string]: string
}

export interface RequestWithUserId extends Request {
  userId?: string
}

export interface ExtendPayload extends JwtPayload {
  userId: string
}

export enum ErrorReason {
  NO_TOKEN,
  INVALID_TOKEN,
  USER_NOT_FOUND,
}
