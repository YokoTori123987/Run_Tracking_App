import { Link, routes } from '@redwoodjs/router'

import Checkpoints from 'src/components/Checkpoint/Checkpoints'

export const QUERY = gql`
  query FindCheckpoints {
    checkpoints {
      id
      parkId
      name
      longitude
      latitude
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No checkpoints yet. '}
      <Link to={routes.newCheckpoint()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ checkpoints }) => {
  return <Checkpoints checkpoints={checkpoints} />
}
