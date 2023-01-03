import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/PathCheckpoint/PathCheckpointsCell'

const DELETE_PATH_CHECKPOINT_MUTATION = gql`
  mutation DeletePathCheckpointMutation($id: String!) {
    deletePathCheckpoint(id: $id) {
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

const PathCheckpointsList = ({ pathCheckpoints }) => {
  const [deletePathCheckpoint] = useMutation(DELETE_PATH_CHECKPOINT_MUTATION, {
    onCompleted: () => {
      toast.success('PathCheckpoint deleted')
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
    if (confirm('Are you sure you want to delete pathCheckpoint ' + id + '?')) {
      deletePathCheckpoint({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Checkpoint id</th>
            <th>Prev checkpoint id</th>
            <th>Is start</th>
            <th>Is finish</th>
            <th>Path id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {pathCheckpoints.map((pathCheckpoint) => (
            <tr key={pathCheckpoint.id}>
              <td>{truncate(pathCheckpoint.id)}</td>
              <td>{truncate(pathCheckpoint.checkpointId)}</td>
              <td>{truncate(pathCheckpoint.prevCheckpointId)}</td>
              <td>{checkboxInputTag(pathCheckpoint.isStart)}</td>
              <td>{checkboxInputTag(pathCheckpoint.isFinish)}</td>
              <td>{truncate(pathCheckpoint.pathId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.pathCheckpoint({ id: pathCheckpoint.id })}
                    title={
                      'Show pathCheckpoint ' + pathCheckpoint.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPathCheckpoint({ id: pathCheckpoint.id })}
                    title={'Edit pathCheckpoint ' + pathCheckpoint.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete pathCheckpoint ' + pathCheckpoint.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(pathCheckpoint.id)}
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

export default PathCheckpointsList
