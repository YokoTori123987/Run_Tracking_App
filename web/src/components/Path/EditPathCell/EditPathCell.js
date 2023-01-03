import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PathForm from 'src/components/Path/PathForm'

export const QUERY = gql`
  query EditPathById($id: String!) {
    path: path(id: $id) {
      id
      name
      parkId
      distance
    }
  }
`
const UPDATE_PATH_MUTATION = gql`
  mutation UpdatePathMutation($id: String!, $input: UpdatePathInput!) {
    updatePath(id: $id, input: $input) {
      id
      name
      parkId
      distance
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ path }) => {
  console.log(path)
  const [updatePath, { loading, error }] = useMutation(UPDATE_PATH_MUTATION, {
    onCompleted: () => {
      toast.success('Path updated')
      navigate(routes.paths())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updatePath({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Path {path?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PathForm path={path} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
