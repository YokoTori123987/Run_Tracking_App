import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CheckpointForm from 'src/components/Checkpoint/CheckpointForm'

const CREATE_CHECKPOINT_MUTATION = gql`
  mutation CreateCheckpointMutation($input: CreateCheckpointInput!) {
    createCheckpoint(input: $input) {
      id
    }
  }
`

const NewCheckpoint = () => {
  const [createCheckpoint, { loading, error }] = useMutation(
    CREATE_CHECKPOINT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Checkpoint created')
        navigate(routes.checkpoints())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCheckpoint({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Checkpoint</h2>
      </header>
      <div className="rw-segment-main">
        <CheckpointForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCheckpoint
