import Lap from 'src/components/Lap/Lap'

export const QUERY = gql`
  query FindLapById($id: String!) {
    lap: lap(id: $id) {
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

export const Success = ({ lap }) => {
  return <Lap lap={lap} />
}
