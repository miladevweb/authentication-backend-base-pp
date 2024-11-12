import { verify, sign } from 'jsonwebtoken'
import { ExtendPayload } from '../interfaces'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? ''
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? ''

export const generateToken = (userId: string, type: 'access' | 'refresh') => {
  switch (type) {
    case 'access':
      return sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
    case 'refresh':
      return sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
  }
}

export const verifyToken = (token: string, type: 'access' | 'refresh') => {
  try {
    switch (type) {
      case 'access':
        return verify(token, ACCESS_TOKEN_SECRET) as ExtendPayload
      case 'refresh':
        return verify(token, REFRESH_TOKEN_SECRET) as ExtendPayload
    }
  } catch (error) {
    console.log(error, 'VERIFY_ERROR')
    return null
  }
}
