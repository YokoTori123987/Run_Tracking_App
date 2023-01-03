import PathCheckpoint from 'src/components/PathCheckpoint/PathCheckpoint'

export const QUERY = gql`
  query FindPathCheckpointById($id: String!) {
    pathCheckpoint: pathCheckpoint(id: $id) {
      id
      checkpointId
      prevCheckpointId
      isStart
      isFinish
      pathId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>PathCheckpoint not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pathCheckpoint }) => {
  return <PathCheckpoint pathCheckpoint={pathCheckpoint} />
}
