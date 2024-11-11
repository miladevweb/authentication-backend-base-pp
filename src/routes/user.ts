import { db } from '../db'
import { Router } from 'express'
import { RequestWithUserId } from '../interfaces'
import { checkJWT } from '../middlewares/jwt.middleware'

export const router = Router()

// api/user
router.get('/', checkJWT, async (req: RequestWithUserId, res) => {
  try {
    const user = await db.user.findFirst({ where: { id: req.userId } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    })
    //
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})
