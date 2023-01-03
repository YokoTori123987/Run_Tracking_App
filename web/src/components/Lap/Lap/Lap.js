import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_LAP_MUTATION = gql`
  mutation DeleteLapMutation($id: String!) {
    deleteLap(id: $id) {
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

const Lap = ({ lap }) => {
  const [deleteLap] = useMutation(DELETE_LAP_MUTATION, {
    onCompleted: () => {
      toast.success('Lap deleted')
      navigate(routes.laps())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete lap ' + id + '?')) {
      deleteLap({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Lap {lap.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{lap.id}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{timeTag(lap.startTime)}</td>
            </tr>
            <tr>
              <th>Stop time</th>
              <td>{timeTag(lap.stopTime)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{lap.userId}</td>
            </tr>
            <tr>
              <th>Path id</th>
              <td>{lap.pathId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editLap({ id: lap.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(lap.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Lap
