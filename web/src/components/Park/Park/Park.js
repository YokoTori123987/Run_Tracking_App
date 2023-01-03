import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_PARK_MUTATION = gql`
  mutation DeleteParkMutation($id: String!) {
    deletePark(id: $id) {
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

const Park = ({ park }) => {
  const [deletePark] = useMutation(DELETE_PARK_MUTATION, {
    onCompleted: () => {
      toast.success('Park deleted')
      navigate(routes.parks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete park ' + id + '?')) {
      deletePark({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Park {park.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{park.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{park.name}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{park.imageUrl}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{park.description}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>{park.address}</td>
            </tr>
            <tr>
              <th>Working hours</th>
              <td>{jsonDisplay(park.workingHours)}</td>
            </tr>
            <tr>
              <th>Owner id</th>
              <td>{park.ownerId}</td>
            </tr>
            <tr>
              <th>Governor id</th>
              <td>{park.governorId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editPark({ id: park.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(park.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Park
