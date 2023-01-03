import { db } from 'src/lib/db'

// ลอง findMany แล้ว where parkId และ distinct userId
export const parksCountUsers = async ({ parkId }) => {
  const parkCountAllUsers = await db.run.findMany({
    where: {
      parkId: parkId,
    },
    distinct: ['userId'],
  })
  let count = 0
  parkCountAllUsers.forEach(() => {
    count++
  })
  return count
}

// export const AllRunInUserOfParks = async ({ governorId }) => {
//   const AllRunInUserOfParks = await db.park.findMany({
//     where: {
//       governorId: governorId,
//     },
//     include: {
//       Run: true,
//       distinct: ['userId'],
//     },
//   })
//   console.log(AllRunInUserOfParks[1].Run)
//   return 'AllRunInUserOfParks'
// }