import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LapForm from 'src/components/Lap/LapForm'

const CREATE_LAP_MUTATION = gql`
  mutation CreateLapMutation($input: CreateLapInput!) {
    createLap(input: $input) {
      id
    }
  }
`

const NewLap = () => {
  const [createLap, { loading, error }] = useMutation(CREATE_LAP_MUTATION, {
    onCompleted: () => {
      toast.success('Lap created')
      navigate(routes.laps())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createLap({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Lap</h2>
      </header>
      <div className="rw-segment-main">
        <LapForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewLap
