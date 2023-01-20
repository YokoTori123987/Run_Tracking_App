import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UpdateUserQr from 'src/components/UpdateUserQr/UpdateUserQr'

  export const QUERY = gql`
    query UpdateUserId($id: String!) {
      user(id: $id) {
        id
        email
        firstName
        lastName
        gender
        dateOfBirth
      }
    }
  `

  const UPDATE_USER_MUTATION = gql`
    mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
      updateUser(id: $id, input: $input) {
        id
        email
        firstName
        lastName
        gender
        dateOfBirth
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User updated')
      navigate(routes.login())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateUser({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit User {user?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UpdateUserQr user={user} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
