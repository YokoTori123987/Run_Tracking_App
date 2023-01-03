import {
  pathCheckpoints,
  pathCheckpoint,
  createPathCheckpoint,
  updatePathCheckpoint,
  deletePathCheckpoint,
} from './pathCheckpoints'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('pathCheckpoints', () => {
  scenario('returns all pathCheckpoints', async (scenario) => {
    const result = await pathCheckpoints()

    expect(result.length).toEqual(Object.keys(scenario.pathCheckpoint).length)
  })

  scenario('returns a single pathCheckpoint', async (scenario) => {
    const result = await pathCheckpoint({
      id: scenario.pathCheckpoint.one.id,
    })

    expect(result).toEqual(scenario.pathCheckpoint.one)
  })

  scenario('creates a pathCheckpoint', async (scenario) => {
    const result = await createPathCheckpoint({
      input: {
        checkpointId: scenario.pathCheckpoint.two.checkpointId,
        isStart: true,
        isFinish: true,
        pathId: scenario.pathCheckpoint.two.pathId,
      },
    })

    expect(result.checkpointId).toEqual(
      scenario.pathCheckpoint.two.checkpointId
    )

    expect(result.isStart).toEqual(true)
    expect(result.isFinish).toEqual(true)
    expect(result.pathId).toEqual(scenario.pathCheckpoint.two.pathId)
  })

  scenario('updates a pathCheckpoint', async (scenario) => {
    const original = await pathCheckpoint({
      id: scenario.pathCheckpoint.one.id,
    })

    const result = await updatePathCheckpoint({
      id: original.id,
      input: { isStart: false },
    })

    expect(result.isStart).toEqual(false)
  })

  scenario('deletes a pathCheckpoint', async (scenario) => {
    const original = await deletePathCheckpoint({
      id: scenario.pathCheckpoint.one.id,
    })

    const result = await pathCheckpoint({ id: original.id })

    expect(result).toEqual(null)
  })
})
