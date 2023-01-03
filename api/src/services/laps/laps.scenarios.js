export const standard = defineScenario({
  lap: {
    one: {
      data: {
        user: {
          create: {
            email: 'String2038715',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        path: {
          create: {
            name: 'String',
            distance: 485567.000497118,
            park: { create: {} },
          },
        },
      },
    },

    two: {
      data: {
        user: {
          create: {
            email: 'String1662226',
            hashedPassword: 'String',
            salt: 'String',
          },
        },

        path: {
          create: {
            name: 'String',
            distance: 2965876.1983200945,
            park: { create: {} },
          },
        },
      },
    },
  },
})
