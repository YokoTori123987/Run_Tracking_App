import { render } from '@redwoodjs/testing/web'

import History from './History'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('History', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<History />)
    }).not.toThrow()
  })
})
