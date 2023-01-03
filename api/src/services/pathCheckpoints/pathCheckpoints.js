import { db } from 'src/lib/db'

export const pathCheckpoints = () => {
  return db.pathCheckpoint.findMany()
}

export const pathCheckpoint = ({ id }) => {
  return db.pathCheckpoint.findUnique({
    where: { id },
  })
}

export const createPathCheckpoint = ({ input }) => {
  return db.pathCheckpoint.create({
    data: input,
  })
}

export const updatePathCheckpoint = ({ id, input }) => {
  return db.pathCheckpoint.update({
    data: input,
    where: { id },
  })
}

export const deletePathCheckpoint = ({ id }) => {
  return db.pathCheckpoint.delete({
    where: { id },
  })
}

export const PathCheckpoint = {
  checkpoint: (_obj, { root }) => {
    return db.pathCheckpoint
      .findUnique({ where: { id: root?.id } })
      .checkpoint()
  },
  prevCheckpoint: (_obj, { root }) => {
    return db.pathCheckpoint
      .findUnique({ where: { id: root?.id } })
      .prevCheckpoint()
  },
  path: (_obj, { root }) => {
    return db.pathCheckpoint.findUnique({ where: { id: root?.id } }).path()
  },
}
