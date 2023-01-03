import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PathCheckpointForm from 'src/components/PathCheckpoint/PathCheckpointForm'

export const QUERY = gql`
  query EditPathCheckpointById($id: String!) {
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
const UPDATE_PATH_CHECKPOINT_MUTATION = gql`
  mutation UpdatePathCheckpointMutation(
    $id: String!
    $input: UpdatePathCheckpointInput!
  ) {
    updatePathCheckpoint(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pathCheckpoint }) => {
  const [updatePathCheckpoint, { loading, error }] = useMutation(
    UPDATE_PATH_CHECKPOINT_MUTATION,
    {
      onCompleted: () => {
        toast.success('PathCheckpoint updated')
        navigate(routes.pathCheckpoints())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updatePathCheckpoint({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit PathCheckpoint {pathCheckpoint?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PathCheckpointForm
          pathCheckpoint={pathCheckpoint}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
