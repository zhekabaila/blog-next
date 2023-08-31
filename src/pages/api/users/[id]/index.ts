import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponseData = {
  status: number
  ok: boolean
  statusText: string
  message: string | any
  data?: User[] | User
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient()

  const userId = req.query.id

  if (typeof userId !== 'string') {
    res.status(400).json({
      status: 400,
      ok: false,
      statusText: 'Bad Request',
      message: 'Invalid user ID',
    })
    return
  }

  switch (req.method) {
    case 'GET':
      prisma.user
        .findUnique({
          where: {
            id: parseInt(userId),
          },
          include: {
            articles: true,
          },
        })
        .then((response) => {
          res.status(200).json({
            data: response,
            status: 200,
            ok: true,
            statusText: 'OK',
            message: 'Success',
          })
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            ok: false,
            statusText: 'ERROR',
            message: err,
          })
        })

      break
    case 'POST':
      res.status(400).json({
        status: 400,
        ok: false,
        statusText: 'ERROR',
        message: 'Method Not Allowed',
      })
      break
    case 'DELETE':
      prisma.user
        .delete({
          where: {
            id: parseInt(userId),
          },
        })
        .then(() => {
          res.status(200).json({
            status: 200,
            ok: true,
            statusText: 'OK',
            message: 'Successfully Deleting User',
          })
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            ok: false,
            statusText: 'ERROR',
            message: err,
          })
        })
      break
    case 'UPDATE':
      prisma.user
        .update({
          where: {
            id: parseInt(userId),
          },
          data: {
            ...req.body,
          },
        })
        .then(() => {
          res.status(200).json({
            status: 200,
            ok: true,
            statusText: 'OK',
            message: 'Successfully Updating User',
          })
        })
        .catch((err) => {
          res.status(400).json({
            status: 400,
            ok: false,
            statusText: 'ERROR',
            message: err,
          })
        })
      break
    default:
  }
}
