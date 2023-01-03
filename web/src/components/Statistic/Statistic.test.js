import { render } from '@redwoodjs/testing/web'

import Statistic from './Statistic'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Statistic', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Statistic />)
    }).not.toThrow()
  })
})
