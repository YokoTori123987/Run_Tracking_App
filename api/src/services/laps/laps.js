import { db } from 'src/lib/db'

export const laps = () => {
  return db.lap.findMany()
}

export const lap = ({ id }) => {
  return db.lap.findUnique({
    where: { id },
  })
}

export const createLap = ({ input }) => {
  return db.lap.create({
    data: input,
  })
}

export const updateLap = ({ id, input }) => {
  return db.lap.update({
    data: input,
    where: { id },
  })
}

export const deleteLap = ({ id }) => {
  return db.lap.delete({
    where: { id },
  })
}

export const Lap = {
  user: (_obj, { root }) => {
    return db.lap.findUnique({ where: { id: root?.id } }).user()
  },
  path: (_obj, { root }) => {
    return db.lap.findUnique({ where: { id: root?.id } }).path()
  },
}
