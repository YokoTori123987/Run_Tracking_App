// import { logger } from '@redwoodjs/api/dist/logger'
import { scheduleJob } from 'node-schedule'

import { db } from 'src/lib/db'
export const users = () => {
  return db.user.findMany()
}

export const user = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  Run: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Run()
  },
  Log: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Log()
  },
  Lap: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).Lap()
  },
}

export const updateRoleUser = ({ id, role }) => {
  return db.user.update({
    data: {
      roles: role,
    },
    where: { id },
  })
}

export const countUsers = async () => {
  const eoe = await db.user.count()
  console.log(eoe)
  return eoe
}

export const resetRun = async () => {
  scheduleJob('* * 0 * * *', async () => {
    await db.user.updateMany({
      data: {
        currentCheckpoint: null,
      },
    })
  })

  return true
}

