import { render } from '@redwoodjs/testing/web'

import EditProfile from './EditProfile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditProfile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditProfile />)
    }).not.toThrow()
  })
})
