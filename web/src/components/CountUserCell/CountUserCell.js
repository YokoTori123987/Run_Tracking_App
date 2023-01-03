export const QUERY = gql`
  query FindCountUserQuery {
    countUsers
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ countUsers }) => {
  return <HomePage countUsers={ countUsers } />
}
