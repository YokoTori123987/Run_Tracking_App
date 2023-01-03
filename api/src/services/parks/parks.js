import { db } from 'src/lib/db'

export const parks = () => {
  return db.park.findMany()
}

export const park = ({ id }) => {
  return db.park.findUnique({
    where: { id },
  })
}

export const parkUserOwner = async ({ userId }) => {
  return await db.park.findFirst({
    where: {
      ownerId: userId,
    },
  })
}

export const parkUserGovernors = async ({ userId }) => {
  return await db.park.findMany({
    where: {
      governorId: userId,
    },
  })
}

export const createPark = ({ input }) => {
  return db.park.create({
    data: input,
  })
}

export const updatePark = ({ id, input }) => {
  return db.park.update({
    data: input,
    where: { id },
  })
}

export const deletePark = ({ id }) => {
  return db.park.delete({
    where: { id },
  })
}

export const Park = {
  Run: (_obj, { root }) => {
    return db.park.findUnique({ where: { id: root?.id } }).Run()
  },
  Checkpoint: (_obj, { root }) => {
    return db.park.findUnique({ where: { id: root?.id } }).Checkpoint()
  },
  Path: (_obj, { root }) => {
    return db.park.findUnique({ where: { id: root?.id } }).Path()
  },
}

export const countParks = async () => {
  const eoe = await db.park.count()
  // console.log(eoe._count.id)
  return eoe
}

export const dwadaw = async ({ parkId }) => {
  const ddd = await db.run.groupBy({
    by: ['parkId'],
    where: {
      parkId: parkId,
    },
    _count: {
      userId: true,
    },
  })
  console.log(ddd)
  return 'ss'
}