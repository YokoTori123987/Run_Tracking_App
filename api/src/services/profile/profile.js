import { db } from 'src/lib/db'

export const profile = () => {
  return db.user.findUnique({
    where: { id: context.currentUser.id },
  })
}

export const updateProfile = ({ input }) => {
  return db.user.update({
    data: input,
    where: { id: context.currentUser.id }
  })
}