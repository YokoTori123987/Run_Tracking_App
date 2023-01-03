import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Run/RunsCell'

const DELETE_RUN_MUTATION = gql`
  mutation DeleteRunMutation($id: String!) {
    deleteRun(id: $id) {
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

const RunsList = ({ runs }) => {
  const [deleteRun] = useMutation(DELETE_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('Run deleted')
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
    if (confirm('Are you sure you want to delete run ' + id + '?')) {
      deleteRun({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Start time</th>
            <th>Stop time</th>
            <th>Distance</th>
            <th>Pace</th>
            <th>User id</th>
            <th>Park id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id}>
              <td>{truncate(run.id)}</td>
              <td>{timeTag(run.startTime)}</td>
              <td>{timeTag(run.stopTime)}</td>
              <td>{truncate(run.distance)}</td>
              <td>{truncate(run.pace)}</td>
              <td>{truncate(run.userId)}</td>
              <td>{truncate(run.parkId)}</td>
              <td>
                <nav className="rw-table-actions">
                  {/* <Link
                    to={routes.run({ id: run.id })}
                    title={'Show run ' + run.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRun({ id: run.id })}
                    title={'Edit run ' + run.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete run ' + run.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(run.id)}
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

export default RunsList
