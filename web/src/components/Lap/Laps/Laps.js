import humanize from 'humanize-string'
import { DateTime } from 'luxon'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Lap/LapsCell'

const DELETE_LAP_MUTATION = gql`
  mutation DeleteLapMutation($id: String!) {
    deleteLap(id: $id) {
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

const LapsList = ({ laps }) => {
  const [deleteLap] = useMutation(DELETE_LAP_MUTATION, {
    onCompleted: () => {
      toast.success('Lap deleted')
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
    if (confirm('Are you sure you want to delete lap ' + id + '?')) {
      deleteLap({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>User Name</th>
            <th>Path Name</th>
            <th>Start time</th>
            <th>Stop time</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {laps.map((lap) => (
            <tr key={lap.id}>
              {/* <td>{truncate(lap.id)}</td> */}

              <td>{truncate(lap.user.firstName + ' ' + lap.user.lastName)}</td>
              <td>{truncate(lap.path.name)}</td>
              <td>
                {DateTime.fromISO(lap.startTime).setLocale('th').toFormat('f')}
              </td>
              <td>
                {DateTime.fromISO(lap.stopTime)
                  .setLocale('th')
                  .toFormat('f') === 'Invalid DateTime' ? (
                  <p> ไม่มีข้อมูล </p>
                ) : (
                  DateTime.fromISO(lap.stopTime).setLocale('th').toFormat('f')
                )}
              </td>
              <td>
                <nav className="rw-table-actions">
                  {/* <Link
                    to={routes.lap({ id: lap.id })}
                    title={'Show lap ' + lap.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editLap({ id: lap.id })}
                    title={'Edit lap ' + lap.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete lap ' + lap.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(lap.id)}
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

export default LapsList
