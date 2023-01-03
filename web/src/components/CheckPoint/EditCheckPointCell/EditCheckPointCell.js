import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CheckpointForm from 'src/components/Checkpoint/CheckpointForm'

export const QUERY = gql`
  query EditCheckpointById($id: String!) {
    checkpoint: checkpoint(id: $id) {
      id
      parkId
      name
      longitude
      latitude
    }
  }
`
const UPDATE_CHECKPOINT_MUTATION = gql`
  mutation UpdateCheckpointMutation(
    $id: String!
    $input: UpdateCheckpointInput!
  ) {
    updateCheckpoint(id: $id, input: $input) {
      id
      parkId
      name
      longitude
      latitude
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ checkpoint }) => {
  const [updateCheckpoint, { loading, error }] = useMutation(
    UPDATE_CHECKPOINT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Checkpoint updated')
        navigate(routes.checkpoints())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateCheckpoint({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Checkpoint {checkpoint?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CheckpointForm
          checkpoint={checkpoint}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
