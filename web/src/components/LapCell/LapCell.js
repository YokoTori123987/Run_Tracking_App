export const QUERY = gql`
  query FindLapQuery2($id: String!) {
    lap: lap(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ lap }) => {
  return <div>{JSON.stringify(lap)}</div>
}
