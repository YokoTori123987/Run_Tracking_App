import { Select as AntSelect } from 'antd'
import { Tag } from 'antd'
import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/User/UsersCell'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`
const UPDATE_ROLE_USER_MUTATION = gql`
  mutation UpdateRoleUserMutation($id: String!, $role: String!) {
    updateRoleUser(id: $id, role: $role) {
      id
      roles
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values)
    }
  }
}

const truncate = (value) => {
  const output = value?.toString()
  if (output?.length > MAX_STRING_LENGTH) {
    return output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output ?? ''
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}
const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}
export const Loading = () => <div>Loading...</div>
const setroles = ['admin', 'user', 'governor', 'owner']

const UsersList = ({ users }) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const [updateRoleUser, { loading, error }] = useMutation(
    UPDATE_ROLE_USER_MUTATION,
    {
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  )

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete user ' + id + '?')) {
      deleteUser({ variables: { id } })
    }
  }
  const handleChangePosition = async (role, id) => {
    console.log(id, role)
    const data = await updateRoleUser({ variables: { id, role } })
    // console.log(JSON.stringify(updateRoleUser))
    console.log(data)
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Hashed password</th>
            <th>Salt</th>
            <th>Reset token</th>
            <th>Reset token expires at</th>
            <th>Roles</th>
            <th>Date of birth</th>
            <th>First name</th>
            <th>Image url</th>
            <th>Last name</th>
            <th>Current checkpoint</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.gender)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.hashedPassword)}</td>
              <td>{truncate(user.salt)}</td>
              <td>{truncate(user.resetToken)}</td>
              <td>{timeTag(user.resetTokenExpiresAt)}</td>
              <td>
                <AntSelect
                  style={{ width: '100px' }}
                  value={truncate(user.roles)}
                  onChange={(e) => handleChangePosition(e, user.id)}
                  loading={loading}
                  error={error}
                >
                  {setroles.map((roles) => (
                    <>
                      <AntSelect.Option value={roles}>
                        <Tag color="black">{roles}</Tag>
                        {/* {roles === 'admin' ? (
                          <Tag color="green">{roles}</Tag>
                        ) : (
                          <Tag color="red">{roles}</Tag>
                        )} */}
                      </AntSelect.Option>
                    </>
                  ))}
                </AntSelect>
              </td>
              <td>{truncate(user.roles)}</td>
              <td>{timeTag(user.dateOfBirth)}</td>
              <td>{truncate(user.firstName)}</td>
              <td>{truncate(user.imageUrl)}</td>
              <td>{truncate(user.lastName)}</td>
              <td>{truncate(user.currentCheckpoint)}</td>
              <td>{timeTag(user.createdAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  {/* <Link
                    to={routes.user({ id: user.id })}
                    title={'Show user ' + user.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link> */}
                  {/* <Link
                    to={routes.editUser({ id: user.id })}
                    title={'Edit user ' + user.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link> */}
                  {/* <button
                    type="button"
                    title={'Delete user ' + user.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(user.id)}
                  >
                    Delete
                  </button> */}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
