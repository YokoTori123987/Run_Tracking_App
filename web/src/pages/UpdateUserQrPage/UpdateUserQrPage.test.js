import { render } from '@redwoodjs/testing/web'

import UpdateUserQrPage from './UpdateUserQrPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateUserQrPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateUserQrPage />)
    }).not.toThrow()
  })
})
