import Park from 'src/components/Park/Park'

export const QUERY = gql`
  query FindParkById($id: String!) {
    park: park(id: $id) {
      id
      name
      imageUrl
      description
      address
      workingHours
      ownerId
      governorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Park not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ park }) => {
  return <Park park={park} />
}
