import { render } from '@redwoodjs/testing/web'

import UpdateUserQr from './UpdateUserQr'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UpdateUserQr', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateUserQr />)
    }).not.toThrow()
  })
})
