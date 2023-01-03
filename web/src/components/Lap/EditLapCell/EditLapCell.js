import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LapForm from 'src/components/Lap/LapForm'

export const QUERY = gql`
  query EditLapById($id: String!) {
    lap: lap(id: $id) {
      id
      startTime
      stopTime
      userId
      pathId
    }
  }
`
const UPDATE_LAP_MUTATION = gql`
  mutation UpdateLapMutation($id: String!, $input: UpdateLapInput!) {
    updateLap(id: $id, input: $input) {
      id
      startTime
      stopTime
      userId
      pathId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ lap }) => {
  const [updateLap, { loading, error }] = useMutation(UPDATE_LAP_MUTATION, {
    onCompleted: () => {
      toast.success('Lap updated')
      navigate(routes.laps())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateLap({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Lap {lap?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <LapForm lap={lap} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
