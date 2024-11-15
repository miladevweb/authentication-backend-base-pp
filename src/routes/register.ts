import { db } from '../db'
import { Router } from 'express'
import { encryptPassword } from '../utils/HandleBcrypt'
import { upload } from '../middlewares/cloudinary.middleware'

export const router = Router()

// api/register
router.post('/', upload.single('image'), async (req, res) => {
  const { email, password, name } = req.body

  try {
    const user = await db.user.findFirst({ where: { email } })
    if (user) return res.status(400).json({ message: 'User already exists' })

    // Hash password
    const hashedPassword = await encryptPassword(password)

    // Create user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: req.file ? req.file.path : undefined, // If there is no file, it'll be undefined <default_value>
      },
    })

    return res.status(201).send()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
})
