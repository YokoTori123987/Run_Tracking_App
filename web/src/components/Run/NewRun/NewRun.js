import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RunForm from 'src/components/Run/RunForm'

const CREATE_RUN_MUTATION = gql`
  mutation CreateRunMutation($input: CreateRunInput!) {
    createRun(input: $input) {
      id
    }
  }
`

const NewRun = () => {
  const [createRun, { loading, error }] = useMutation(CREATE_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('Run created')
      navigate(routes.runs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createRun({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Run</h2>
      </header>
      <div className="rw-segment-main">
        <RunForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRun
