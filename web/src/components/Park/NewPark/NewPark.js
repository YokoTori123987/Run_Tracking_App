import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ParkForm from 'src/components/Park/ParkForm'

const CREATE_PARK_MUTATION = gql`
  mutation CreateParkMutation($input: CreateParkInput!) {
    createPark(input: $input) {
      id
    }
  }
`

const NewPark = () => {
  const [createPark, { loading, error }] = useMutation(CREATE_PARK_MUTATION, {
    onCompleted: () => {
      toast.success('Park created')
      navigate(routes.parks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createPark({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Park</h2>
      </header>
      <div className="rw-segment-main">
        <ParkForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPark
