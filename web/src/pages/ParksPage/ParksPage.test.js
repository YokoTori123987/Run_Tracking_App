import { render } from '@redwoodjs/testing/web'

import ParksPage from './ParksPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ParksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ParksPage />)
    }).not.toThrow()
  })
})
