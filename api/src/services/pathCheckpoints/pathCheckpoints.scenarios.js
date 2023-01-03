export const standard = defineScenario({
  pathCheckpoint: {
    one: {
      data: {
        isStart: true,
        isFinish: true,
        checkpoint: { create: { name: 'String', park: { create: {} } } },
        path: {
          create: {
            name: 'String',
            distance: 6830578.966907472,
            park: { create: {} },
          },
        },
      },
    },

    two: {
      data: {
        isStart: true,
        isFinish: true,
        checkpoint: { create: { name: 'String', park: { create: {} } } },
        path: {
          create: {
            name: 'String',
            distance: 1765476.3174331079,
            park: { create: {} },
          },
        },
      },
    },
  },
})
