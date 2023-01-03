import { render } from '@redwoodjs/testing/web'

import BlogPark from './BlogPark'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BlogPark', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlogPark />)
    }).not.toThrow()
  })
})
