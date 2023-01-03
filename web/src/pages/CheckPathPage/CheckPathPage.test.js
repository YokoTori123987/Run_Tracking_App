import { render } from '@redwoodjs/testing/web'

import CheckPathPage from './CheckPathPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CheckPathPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckPathPage />)
    }).not.toThrow()
  })
})
