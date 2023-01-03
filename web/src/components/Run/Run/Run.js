import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_RUN_MUTATION = gql`
  mutation DeleteRunMutation($id: String!) {
    deleteRun(id: $id) {
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

const Run = ({ run }) => {
  const [deleteRun] = useMutation(DELETE_RUN_MUTATION, {
    onCompleted: () => {
      toast.success('Run deleted')
      navigate(routes.runs())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete run ' + id + '?')) {
      deleteRun({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Run {run.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{run.id}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{timeTag(run.startTime)}</td>
            </tr>
            <tr>
              <th>Stop time</th>
              <td>{timeTag(run.stopTime)}</td>
            </tr>
            <tr>
              <th>Distance</th>
              <td>{run.distance}</td>
            </tr>
            <tr>
              <th>Pace</th>
              <td>{run.pace}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{run.userId}</td>
            </tr>
            <tr>
              <th>Park id</th>
              <td>{run.parkId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRun({ id: run.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(run.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Run
