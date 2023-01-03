import { Link, routes } from '@redwoodjs/router'

import Laps from 'src/components/Lap/Laps'

export const QUERY = gql`
  query FindLaps {
    laps {
      id
      startTime
      stopTime
      userId
      pathId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No data laps yet. '}
      {/* <Link to={routes.newLap()} className="rw-link">
        {'Create one?'}
      </Link> */}
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ laps }) => {
  return <Laps laps={laps} />
}
