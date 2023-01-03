import { db } from 'src/lib/db'

export const checkpoints = () => {
  return db.checkpoint.findMany()
}

export const checkpoint = ({ id }) => {
  return db.checkpoint.findUnique({
    where: { id },
  })
}

export const createCheckpoint = ({ input }) => {
  return db.checkpoint.create({
    data: input,
  })
}

export const updateCheckpoint = ({ id, input }) => {
  return db.checkpoint.update({
    data: input,
    where: { id },
  })
}

export const deleteCheckpoint = ({ id }) => {
  return db.checkpoint.delete({
    where: { id },
  })
}

export const Checkpoint = {
  park: (_obj, { root }) => {
    return db.checkpoint.findUnique({ where: { id: root?.id } }).park()
  },
  Log: (_obj, { root }) => {
    return db.checkpoint.findUnique({ where: { id: root?.id } }).Log()
  },
  PathCheckpoint: (_obj, { root }) => {
    return db.checkpoint
      .findUnique({ where: { id: root?.id } })
      .PathCheckpoint()
  },
  PrevPathCheckpoint: (_obj, { root }) => {
    return db.checkpoint
      .findUnique({ where: { id: root?.id } })
      .PrevPathCheckpoint()
  },
}

export const checkRunningPath = async ({ userId, checkpointId }) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  })
  const checkpointNull = await db.pathCheckpoint.findFirst({
    where: {
      checkpointId: checkpointId,
      AND: { prevCheckpointId: null },
    },
  })
  const checkpoint = await db.pathCheckpoint.findFirst({
    where: {
      checkpointId: checkpointId,
      NOT: { prevCheckpointId: null },
    },
  })

  if (checkpoint) {
    if (user.currentCheckpoint == checkpoint.prevCheckpointId) {
      if (checkpoint.isFinish === true) {
        stopRuning({ userId, checkpointId, checkpointNull })
      } else {
        await db.user.update({
          data: { currentCheckpoint: checkpointId },
          where: {
            id: userId,
          },
        })
        await db.log.create({
          data: {
            userId: userId,
            timeStamp: new Date(),
            checkpointId: checkpointId,
          },
        })
      }
    }
  }
  if (checkpointNull) {
    startRuning({ userId, checkpointNull, checkpointId })
  }
  return true
}

const startRuning = async ({ userId, checkpointNull, checkpointId }) => {
  const user = await db.user.findUnique({
    where: { id: userId },
  })
  if (user.currentCheckpoint === checkpointNull.prevCheckpointId) {
    if (checkpointNull.isStart === true) {
      await db.user.update({
        data: { currentCheckpoint: checkpointId },
        where: {
          id: userId,
        },
      })
      await db.log.create({
        data: {
          userId: userId,
          timeStamp: new Date(),
          checkpointId: checkpointId,
        },
      })
      await db.lap.create({
        data: {
          userId: userId,
          pathId: checkpointNull.pathId,
          startTime: new Date(),
          stopTime: null,
        },
      })
    }
  }
}

const stopRuning = async ({ userId, checkpointId, checkpointNull }) => {
  const dayjs = require('dayjs')
  await db.log.create({
    data: {
      userId: userId,
      timeStamp: new Date(),
      checkpointId: checkpointId,
    },
  })

  const poplap = await db.lap.findMany({
    orderBy: {
      stopTime: 'desc',
    },
    where: {
      userId: userId,
      AND: {
        pathId: checkpoint.pathId,
      },
    },
    include: {
      path: true,
    },
  })

  const createrun = await db.lap.update({
    where: {
      id: poplap[0].id,
    },
    data: { stopTime: new Date() },
  })

  const lopiuo = dayjs(createrun.stopTime).diff(
    createrun.startTime,
    'minute',
    true
  )

  console.log(lopiuo.toFixed(2))

  await db.run.create({
    data: {
      startTime: createrun.startTime,
      stopTime: createrun.stopTime,
      distance: poplap[0].path.distance,
      pace: lopiuo.toFixed(2) / poplap[0].path.distance,
      userId: createrun.userId,
      parkId: poplap[0].path.parkId,
    },
  })
  await db.user.update({
    data: { currentCheckpoint: null },
    where: {
      id: userId,
    },
  })
  if (checkpointNull) {
    startRuning({ userId, checkpointNull, checkpointId })
  }
}