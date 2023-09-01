import { PrismaClient, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponseData = {
  status: number
  ok: boolean
  statusText: 'OK' | 'Continue' | 'Not Found'
  message: string
  data?: User[] | User
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prisma = new PrismaClient()

  let userQuery = {}

  if (req.query.username || req.query.email || req.query.gender) {
    userQuery = {
      ...userQuery,
      ...req.query,
    }
  } else {
    userQuery = {}
  }

  switch (req.method) {
    case 'GET':
      prisma.user
        .findMany({
          where: {
            ...userQuery,
            articles: {
              some: {},
            },
          },
          include: {
            articles: true,
            comments: true,
          },
        })
        .then((response) => {
          //? Conditional If User Exist
          res.status(200).json({
            data: response,
            status: 200,
            ok: true,
            statusText: 'OK',
            message: 'Success',
          })
        })
        .catch((error) => {
          //? Conditional If User Does Not Exist
          res.status(405).json({
            status: 405,
            ok: false,
            statusText: 'Not Found',
            message: error,
          })
        })
      break
    case 'POST':
      const data = req.body
      prisma.user
        .create({
          data,
        })
        .then((response) => {
          return res.status(200).json({
            data: response,
            status: 200,
            ok: true,
            statusText: 'OK',
            message: 'Success',
          })
        })
        .catch((err) => {
          return res.status(400).json({
            status: 400,
            ok: false,
            statusText: 'Not Found',
            message: err,
          })
        })
      break
    case 'UPDATE':
      return res.status(405).json({
        status: 405,
        ok: false,
        statusText: 'Not Found',
        message: 'Error',
      })
    case 'DELETE':
      return res.status(405).json({
        status: 405,
        ok: false,
        statusText: 'Not Found',
        message: 'Error',
      })
    default:
      res.status(400).json({
        status: 400,
        ok: false,
        statusText: 'Not Found',
        message: 'Error',
      })
  }
}
