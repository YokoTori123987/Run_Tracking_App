import { Link, routes } from '@redwoodjs/router'
import { Card, Col, Row, Input, Space ,Search } from 'antd';

export const QUERY = gql`
  query BlogParksQuery {
    parks {
      id
      name
      imageUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ parks }) => {
  return (
    <>
      {parks.map((park) => (
        <div key={park.id}>
          <div className="mt-6 text-xl font-mono font-bold flex justify-center">
            <Link to={routes.blogPark({ id: park.id })}>{park.name}</Link>
          </div>
          <div className="mt-8 flex items-center justify-center">
            <Link to={routes.blogPark({ id: park.id })}>
              <img src={park.imageUrl} alt="park" className="h-64 w-96 md:h-[30rem] md:w-[40rem]" />
            </Link>
          </div>
          <div className="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700" />
        </div>
      ))}
    </>
  )
}