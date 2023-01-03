import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Path/PathsCell'

const DELETE_PATH_MUTATION = gql`
  mutation DeletePathMutation($id: String!) {
    deletePath(id: $id) {
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

const PathsList = ({ paths }) => {
  const [deletePath] = useMutation(DELETE_PATH_MUTATION, {
    onCompleted: () => {
      toast.success('Path deleted')
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
    if (confirm('Are you sure you want to delete path ' + id + '?')) {
      deletePath({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Park id</th>
            <th>Distance</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {paths.map((path) => (
            <tr key={path.id}>
              <td>{truncate(path.id)}</td>
              <td>{truncate(path.name)}</td>
              <td>{truncate(path.parkId)}</td>
              <td>{truncate(path.distance)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.newPathCheckpoint({ id: path.id })}
                    title={'New PathCheckpoint ' + path.id + ' detail'}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    New PathCheckpoint
                  </Link>
                  <Link
                    to={routes.path({ id: path.id })}
                    title={'Show path ' + path.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editPath({ id: path.id })}
                    title={'Edit path ' + path.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete path ' + path.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(path.id)}
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

export default PathsList
