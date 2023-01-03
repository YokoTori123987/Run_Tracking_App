import { Link, routes } from '@redwoodjs/router'

import Paths from 'src/components/Path/Paths'

export const QUERY = gql`
  query FindPaths {
    paths {
      id
      name
      parkId
      distance
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No paths yet. '}
      <Link to={routes.newPath()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ paths }) => {
  return <Paths paths={paths} />
}
