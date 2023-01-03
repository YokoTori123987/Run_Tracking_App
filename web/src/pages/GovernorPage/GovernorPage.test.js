import { render } from '@redwoodjs/testing/web'

import GovernorPage from './GovernorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GovernorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GovernorPage />)
    }).not.toThrow()
  })
})
