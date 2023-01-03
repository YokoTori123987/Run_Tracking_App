import Path from 'src/components/Path/Path'

export const QUERY = gql`
  query FindPathById($id: String!) {
    path: path(id: $id) {
      id
      name
      parkId
      distance
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Path not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ path }) => {
  return <Path path={path} />
}
