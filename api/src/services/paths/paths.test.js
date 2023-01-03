import { paths, path, createPath, updatePath, deletePath } from './paths'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('paths', () => {
  scenario('returns all paths', async (scenario) => {
    const result = await paths()

    expect(result.length).toEqual(Object.keys(scenario.path).length)
  })

  scenario('returns a single path', async (scenario) => {
    const result = await path({ id: scenario.path.one.id })

    expect(result).toEqual(scenario.path.one)
  })

  scenario('creates a path', async (scenario) => {
    const result = await createPath({
      input: {
        name: 'String',
        parkId: scenario.path.two.parkId,
        distance: 9999643.119740492,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.parkId).toEqual(scenario.path.two.parkId)
    expect(result.distance).toEqual(9999643.119740492)
  })

  scenario('updates a path', async (scenario) => {
    const original = await path({ id: scenario.path.one.id })
    const result = await updatePath({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a path', async (scenario) => {
    const original = await deletePath({ id: scenario.path.one.id })
    const result = await path({ id: original.id })

    expect(result).toEqual(null)
  })
})
