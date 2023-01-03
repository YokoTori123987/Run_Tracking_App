import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LogForm from 'src/components/Log/LogForm'

const CREATE_LOG_MUTATION = gql`
  mutation CreateLogMutation($input: CreateLogInput!) {
    createLog(input: $input) {
      id
    }
  }
`

const NewLog = () => {
  const [createLog, { loading, error }] = useMutation(CREATE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log created')
      navigate(routes.logs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createLog({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Log</h2>
      </header>
      <div className="rw-segment-main">
        <LogForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLog
