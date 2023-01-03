import {
  checkpoints,
  checkpoint,
  createCheckpoint,
  updateCheckpoint,
  deleteCheckpoint,
} from './checkpoints'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('checkpoints', () => {
  scenario('returns all checkpoints', async (scenario) => {
    const result = await checkpoints()

    expect(result.length).toEqual(Object.keys(scenario.checkpoint).length)
  })

  scenario('returns a single checkpoint', async (scenario) => {
    const result = await checkpoint({ id: scenario.checkpoint.one.id })

    expect(result).toEqual(scenario.checkpoint.one)
  })

  scenario('creates a checkpoint', async (scenario) => {
    const result = await createCheckpoint({
      input: { parkId: scenario.checkpoint.two.parkId, name: 'String' },
    })

    expect(result.parkId).toEqual(scenario.checkpoint.two.parkId)
    expect(result.name).toEqual('String')
  })

  scenario('updates a checkpoint', async (scenario) => {
    const original = await checkpoint({
      id: scenario.checkpoint.one.id,
    })

    const result = await updateCheckpoint({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a checkpoint', async (scenario) => {
    const original = await deleteCheckpoint({
      id: scenario.checkpoint.one.id,
    })

    const result = await checkpoint({ id: original.id })

    expect(result).toEqual(null)
  })
})
