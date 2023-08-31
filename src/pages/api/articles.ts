import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Gender = 'male' | 'female'
type Role = 'user' | 'admin'

interface User {
  id: number
  username: string
  email: string
  password: string
  gender: Gender | string
  role: Role | string
}

interface Article {}

type ResponseData = {
  message: string
  data?: any
  users?: User[]
  createNewUser?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient()

  switch (req.method) {
    case 'GET':
      const users = await prisma.user.findMany().then((res) => res)
      res.status(200).json({ users, message: 'Success' })
      break
    case 'POST':
      const data = req.body

      const createNewUser = await prisma.user.create({
        data,
      })

      res.status(200).json({ createNewUser, message: 'Success' })
      break
    case 'UPDATE':
      res.status(200).json({ message: 'Error' })
      break
    case 'DELETE':
      res.status(200).json({ message: 'Error' })
      break
    default:
      res.status(200).json({ message: 'Error' })
  }
}
