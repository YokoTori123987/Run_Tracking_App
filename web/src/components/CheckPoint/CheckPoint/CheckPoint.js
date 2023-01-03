import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_CHECKPOINT_MUTATION = gql`
  mutation DeleteCheckpointMutation($id: String!) {
    deleteCheckpoint(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Checkpoint = ({ checkpoint }) => {
  const [deleteCheckpoint] = useMutation(DELETE_CHECKPOINT_MUTATION, {
    onCompleted: () => {
      toast.success('Checkpoint deleted')
      navigate(routes.checkpoints())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete checkpoint ' + id + '?')) {
      deleteCheckpoint({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Checkpoint {checkpoint.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{checkpoint.id}</td>
            </tr>
            <tr>
              <th>Park id</th>
              <td>{checkpoint.parkId}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{checkpoint.name}</td>
            </tr>
            <tr>
              <th>Longitude</th>
              <td>{checkpoint.longitude}</td>
            </tr>
            <tr>
              <th>Latitude</th>
              <td>{checkpoint.latitude}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCheckpoint({ id: checkpoint.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(checkpoint.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Checkpoint
