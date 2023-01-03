import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Park/ParksCell'

const DELETE_PARK_MUTATION = gql`
  mutation DeleteParkMutation($id: String!) {
    deletePark(id: $id) {
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

const ParksList = ({ parks }) => {
  const [deletePark] = useMutation(DELETE_PARK_MUTATION, {
    onCompleted: () => {
      toast.success('Park deleted')
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
    if (confirm('Are you sure you want to delete park ' + id + '?')) {
      deletePark({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Image url</th>
            <th>Description</th>
            <th>Address</th>
            <th>Working hours</th>
            <th>Owner id</th>
            <th>Governor id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {parks.map((park) => (
            <tr key={park.id}>
              <td>{truncate(park.id)}</td>
              <td>{truncate(park.name)}</td>
              <td>{truncate(park.imageUrl)}</td>
              <td>{truncate(park.description)}</td>
              <td>{truncate(park.address)}</td>
              <td>{jsonTruncate(park.workingHours)}</td>
              <td>{truncate(park.ownerId)}</td>
              <td>{truncate(park.governorId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.park({ id: park.id })}
                    title={'Show park ' + park.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPark({ id: park.id })}
                    title={'Edit park ' + park.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete park ' + park.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(park.id)}
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

export default ParksList
