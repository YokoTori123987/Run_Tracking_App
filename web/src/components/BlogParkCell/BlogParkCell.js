import BlogPark from 'src/components/BlogPark'

export const QUERY = gql`
  query FindBlogParkQuery($id: String!) {
    park(id: $id) {
      id
      name
      imageUrl
      description
      address
      workingHours
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ park }) => {
  return <BlogPark park={park} />
}
