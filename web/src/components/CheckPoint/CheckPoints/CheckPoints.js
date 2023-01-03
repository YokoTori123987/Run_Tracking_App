import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Checkpoint/CheckpointsCell'

const DELETE_CHECKPOINT_MUTATION = gql`
  mutation DeleteCheckpointMutation($id: String!) {
    deleteCheckpoint(id: $id) {
      id
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

const CheckpointsList = ({ checkpoints }) => {
  const [deleteCheckpoint] = useMutation(DELETE_CHECKPOINT_MUTATION, {
    onCompleted: () => {
      toast.success('Checkpoint deleted')
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

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete checkpoint ' + id + '?')) {
      deleteCheckpoint({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Park id</th>
            <th>Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {checkpoints.map((checkpoint) => (
            <tr key={checkpoint.id}>
              <td>{truncate(checkpoint.id)}</td>
              <td>{truncate(checkpoint.parkId)}</td>
              <td>{truncate(checkpoint.name)}</td>
              <td>{truncate(checkpoint.longitude)}</td>
              <td>{truncate(checkpoint.latitude)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.checkpoint({ id: checkpoint.id })}
                    title={'Show checkpoint ' + checkpoint.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCheckpoint({ id: checkpoint.id })}
                    title={'Edit checkpoint ' + checkpoint.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete checkpoint ' + checkpoint.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(checkpoint.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CheckpointsList
