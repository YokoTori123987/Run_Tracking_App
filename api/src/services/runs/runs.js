import { db } from 'src/lib/db'

export const runs = () => {
  return db.run.findMany()
}

export const run = ({ id }) => {
  return db.run.findUnique({
    where: { id },
  })
}

export const createRun = ({ input }) => {
  return db.run.create({
    data: input,
  })
}

export const updateRun = ({ id, input }) => {
  return db.run.update({
    data: input,
    where: { id },
  })
}

export const deleteRun = ({ id }) => {
  return db.run.delete({
    where: { id },
  })
}

export const Run = {
  park: (_obj, { root }) => {
    return db.run.findUnique({ where: { id: root?.id } }).park()
  },
  user: (_obj, { root }) => {
    return db.run.findUnique({ where: { id: root?.id } }).user()
  },
}

export const findCurrentRun = () => {
  return db.run.findFirst({
    orderBy: {
      startTime: 'desc',
    },
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const findHistoryRun = () => {
  return db.run.findMany({
    orderBy: {
      startTime: 'desc',
    },
    where: { userId: context.currentUser.id }
  })
}

export const findTotalRun = async ({ userId }) => {
  const totalDistance = await db.run.aggregate({
    _sum: {
      distance: true,
    },
    where: {
      userId: userId,
    },
  })
  return totalDistance._sum.distance
}

export const findBestPace = () => {
  return db.run.findFirst({
    orderBy: {
      pace: 'asc',
    },
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const findTimeDiff = async ({ userId }) => {
  const totalTime = await db.run.aggregate({

  })
}