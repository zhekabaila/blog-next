import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponseData = {
  status: number
  ok: boolean
  statusText: string
  message: string | any
  data?: User[] | User | any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient()

  const userId = req.query.id

  switch (req.method) {
    case 'GET':
      const user = await prisma.user.findUnique({
        where: {
          id: userId?.toString(),
        },
      })
      res.status(200).json({
        data: user,
        status: 200,
        ok: true,
        statusText: 'OK',
        message: 'Success',
      })
      break
    default:
      res.status(200).json({
        status: 405,
        ok: false,
        statusText: 'ERROR',
        message: 'Method Not Allowed',
      })
      break
  }
}
