import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_PATH_CHECKPOINT_MUTATION = gql`
  mutation DeletePathCheckpointMutation($id: String!) {
    deletePathCheckpoint(id: $id) {
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

const PathCheckpoint = ({ pathCheckpoint }) => {
  const [deletePathCheckpoint] = useMutation(DELETE_PATH_CHECKPOINT_MUTATION, {
    onCompleted: () => {
      toast.success('PathCheckpoint deleted')
      navigate(routes.pathCheckpoints())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete pathCheckpoint ' + id + '?')) {
      deletePathCheckpoint({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            PathCheckpoint {pathCheckpoint.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{pathCheckpoint.id}</td>
            </tr>
            <tr>
              <th>Checkpoint id</th>
              <td>{pathCheckpoint.checkpointId}</td>
            </tr>
            <tr>
              <th>Prev checkpoint id</th>
              <td>{pathCheckpoint.prevCheckpointId}</td>
            </tr>
            <tr>
              <th>Is start</th>
              <td>{checkboxInputTag(pathCheckpoint.isStart)}</td>
            </tr>
            <tr>
              <th>Is finish</th>
              <td>{checkboxInputTag(pathCheckpoint.isFinish)}</td>
            </tr>
            <tr>
              <th>Path id</th>
              <td>{pathCheckpoint.pathId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPathCheckpoint({ id: pathCheckpoint.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(pathCheckpoint.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default PathCheckpoint
