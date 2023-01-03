import { Link, routes } from '@redwoodjs/router'

import PathCheckpoints from 'src/components/PathCheckpoint/PathCheckpoints'

export const QUERY = gql`
  query FindPathCheckpoints {
    pathCheckpoints {
      id
      checkpointId
      prevCheckpointId
      isStart
      isFinish
      pathId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No pathCheckpoints yet. '}
      <Link to={routes.newPathCheckpoint()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ pathCheckpoints }) => {
  return <PathCheckpoints pathCheckpoints={pathCheckpoints} />
}
