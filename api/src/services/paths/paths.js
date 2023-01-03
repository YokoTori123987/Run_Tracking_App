import { db } from 'src/lib/db'

export const paths = () => {
  return db.path.findMany()
}

export const path = ({ id }) => {
  return db.path.findUnique({
    where: { id },
  })
}

export const createPath = ({ input }) => {
  return db.path.create({
    data: input,
  })
}

export const updatePath = ({ id, input }) => {
  return db.path.update({
    data: input,
    where: { id },
  })
}

export const deletePath = ({ id }) => {
  return db.path.delete({
    where: { id },
  })
}

export const Path = {
  park: (_obj, { root }) => {
    return db.path.findUnique({ where: { id: root?.id } }).park()
  },
  Lap: (_obj, { root }) => {
    return db.path.findUnique({ where: { id: root?.id } }).Lap()
  },
  PathCheckpoint: (_obj, { root }) => {
    return db.path.findUnique({ where: { id: root?.id } }).PathCheckpoint()
  },
}
