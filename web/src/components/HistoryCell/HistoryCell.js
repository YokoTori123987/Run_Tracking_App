import { History } from "../../components/History/History"

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'no-cache',
  }
}

export const QUERY = gql`
  query FindHistoryQuery {
    findHistoryRun {
      id
      startTime
      stopTime
      distance
      pace
      userId
      park {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ findHistoryRun }) => {
  return <History findHistoryRun={ findHistoryRun }/>
}
