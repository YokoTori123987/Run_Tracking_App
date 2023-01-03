import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LogForm from 'src/components/Log/LogForm'

export const QUERY = gql`
  query EditLogById($id: String!) {
    log: log(id: $id) {
      id
      userId
      timeStamp
      checkpointId
    }
  }
`
const UPDATE_LOG_MUTATION = gql`
  mutation UpdateLogMutation($id: String!, $input: UpdateLogInput!) {
    updateLog(id: $id, input: $input) {
      id
      userId
      timeStamp
      checkpointId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ log }) => {
  const [updateLog, { loading, error }] = useMutation(UPDATE_LOG_MUTATION, {
    onCompleted: () => {
      toast.success('Log updated')
      navigate(routes.logs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateLog({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Log {log?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <LogForm log={log} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
