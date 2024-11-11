import { verifyToken } from '../utils/HandleJWT'
import { RequestWithUserId } from '../interfaces'
import { type Response, type NextFunction } from 'express'

export const checkJWT = async (req: RequestWithUserId, res: Response, next: NextFunction) => {
  try {
    const bearerHeader = req.headers.authorization || ''
    const token = bearerHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'No token provided' })

    // Verify token and get userId from it
    const decoded = verifyToken(token, 'access')
    if (!decoded) return res.status(401).json({ message: 'Invalid token - Please login again' })

    req.userId = decoded.userId
    next()
    //
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
