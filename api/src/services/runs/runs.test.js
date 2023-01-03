import { runs, run, createRun, updateRun, deleteRun } from './runs'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('runs', () => {
  scenario('returns all runs', async (scenario) => {
    const result = await runs()

    expect(result.length).toEqual(Object.keys(scenario.run).length)
  })

  scenario('returns a single run', async (scenario) => {
    const result = await run({ id: scenario.run.one.id })

    expect(result).toEqual(scenario.run.one)
  })

  scenario('creates a run', async (scenario) => {
    const result = await createRun({
      input: {
        userId: scenario.run.two.userId,
        parkId: scenario.run.two.parkId,
      },
    })

    expect(result.userId).toEqual(scenario.run.two.userId)
    expect(result.parkId).toEqual(scenario.run.two.parkId)
  })

  scenario('updates a run', async (scenario) => {
    const original = await run({ id: scenario.run.one.id })
    const result = await updateRun({
      id: original.id,
      input: { parkId: scenario.run.two.userId },
    })

    expect(result.parkId).toEqual(scenario.run.two.userId)
  })

  scenario('deletes a run', async (scenario) => {
    const original = await deleteRun({ id: scenario.run.one.id })
    const result = await run({ id: original.id })

    expect(result).toEqual(null)
  })
})
