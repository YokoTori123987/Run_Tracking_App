// import { useMutation } from '@redwoodjs/web'
// import { toast } from '@redwoodjs/web/toast'

// import Routes from 'src/Routes'

// const RESSET_RUNING = gql`
//   mutation ResetCheckpointMutation($currentCheckpoint: String!) {
//     resetRun(currentCheckpoint: $currentCheckpoint)
//   }
// `
// const schedule = require('node-schedule')
// // const { resetRun } = require('../../api/src/services/users/users.js')
// const rule = new schedule.RecurrenceRule()
// rule.second = 0
// rule.tz = 'Asia/Bangkok'

// const ResetTimeRun = () => {
//   schedule.scheduleJob(rule, function () {
//     console.log('2222222222222222')
//     resetRuning()
//   })
//   const [resetRun] = useMutation(RESSET_RUNING, {
//     onError: (error) => {
//       toast.error(error.message)
//     },
//   })
//   const resetRuning = () => {
//     let currentCheckpoint = 'null'
//     resetRun({ variables: { currentCheckpoint } })
//   }
// }
// export default ResetTimeRun
