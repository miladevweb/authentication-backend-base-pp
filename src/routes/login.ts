import { db } from '../db'
import { Router } from 'express'
import { generateToken } from '../utils/HandleJWT'
import { comparePassword } from '../utils/HandleBcrypt'

export const router = Router()

// api/login
router.post('/', async (req, res) => {
  try {
    const { password, email } = req.body

    // Find user
    const user = await db.user.findFirst({ where: { email } })
    if (!user) return res.status(401).json({ message: 'Invalid email' })

    // Compare password
    const isValid = await comparePassword(password, user.password!)
    if (!isValid) return res.status(401).json({ message: 'Invalid password' })

    // Generate token
    const userId = user.id!
    const access = generateToken(userId, 'access')
    const refresh = generateToken(userId, 'refresh')

    return res.status(200).json({ access, refresh })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})

