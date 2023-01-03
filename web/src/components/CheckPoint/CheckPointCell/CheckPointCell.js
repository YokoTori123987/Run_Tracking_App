import Checkpoint from 'src/components/Checkpoint/Checkpoint'

export const QUERY = gql`
  query FindCheckpointById($id: String!) {
    checkpoint: checkpoint(id: $id) {
      id
      parkId
      name
      longitude
      latitude
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Checkpoint not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ checkpoint }) => {
  return <Checkpoint checkpoint={checkpoint} />
}
