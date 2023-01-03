import { parks, park, deletePark } from './parks'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('parks', () => {
  scenario('returns all parks', async (scenario) => {
    const result = await parks()

    expect(result.length).toEqual(Object.keys(scenario.park).length)
  })

  scenario('returns a single park', async (scenario) => {
    const result = await park({ id: scenario.park.one.id })

    expect(result).toEqual(scenario.park.one)
  })

  scenario('deletes a park', async (scenario) => {
    const original = await deletePark({ id: scenario.park.one.id })
    const result = await park({ id: original.id })

    expect(result).toEqual(null)
  })
})
