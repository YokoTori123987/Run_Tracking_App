export const standard = defineScenario({
  run: {
    one: {
      data: {
        park: { create: {} },
        user: {
          create: {
            email: 'String8294480',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },

    two: {
      data: {
        park: { create: {} },
        user: {
          create: {
            email: 'String8391635',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})
