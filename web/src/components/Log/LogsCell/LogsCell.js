import { Link, routes } from '@redwoodjs/router'

import Logs from 'src/components/Log/Logs'

export const QUERY = gql`
  query FindLogs {
    logs {
      id
      userId
      timeStamp
      checkpointId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No data logs yet. '}
      {/* <Link to={routes.newLog()} className="rw-link">
        {'Create one?'}
      </Link> */}
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ logs }) => {
  return <Logs logs={logs} />
}
