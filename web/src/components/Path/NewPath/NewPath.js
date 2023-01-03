import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PathForm from 'src/components/Path/PathForm'

const CREATE_PATH_MUTATION = gql`
  mutation CreatePathMutation($input: CreatePathInput!) {
    createPath(input: $input) {
      id
    }
  }
`

const NewPath = () => {
  const [createPath, { loading, error }] = useMutation(CREATE_PATH_MUTATION, {
    onCompleted: () => {
      toast.success('Path created')
      navigate(routes.paths())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createPath({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Path</h2>
      </header>
      <div className="rw-segment-main">
        <PathForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewPath
