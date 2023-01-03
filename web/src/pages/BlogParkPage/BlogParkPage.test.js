import { render } from '@redwoodjs/testing/web'

import BlogParkPage from './BlogParkPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BlogParkPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlogParkPage />)
    }).not.toThrow()
  })
})
