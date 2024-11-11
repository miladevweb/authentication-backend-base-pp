import { db } from '../db'
import { Router } from 'express'
import { generateToken, verifyToken } from '../utils/HandleJWT'

export const router = Router()

// api/refresh
router.post('/', async (req, res) => {
  const { refresh } = req.body

  if (!refresh) return res.status(400).json({ messagge: 'Invalid refresh token' })

  // Verify token
  const decoded = verifyToken(refresh, 'refresh')
  if (!decoded) return res.status(401).json({ message: 'Invalid refresh token - Please login again' })

  try {
    const user = await db.user.findFirst({ where: { id: decoded.userId }, select: { id: true } })
    if (!user) return res.status(401).json({ message: 'Invalid User' })

    // Generate new token
    const access = generateToken(user.id, 'access')
    return res.status(200).json({ token: access })
    //
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})
