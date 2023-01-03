export const schema = gql`
  type User {
    id: String!
    gender: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    dateOfBirth: DateTime
    firstName: String
    imageUrl: String
    lastName: String
    currentCheckpoint: String
    createdAt: DateTime
    Run: [Run]!
    Log: [Log]!
    Lap: [Lap]!
    OwnedParks: [Park]!
    GovernedParks: [Park]!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: String!): User @skipAuth
    countUsers: String @skipAuth
  }

  input CreateUserInput {
    gender: String
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String!
    dateOfBirth: DateTime
    firstName: String
    imageUrl: String
    lastName: String
    currentCheckpoint: String
  }

  input UpdateUserInput {
    gender: String
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: String
    dateOfBirth: DateTime
    firstName: String
    imageUrl: String
    lastName: String
    currentCheckpoint: String
  }

  input UpdateUserProfile {
    firstName: String!
    lastName: String!
    imageUrl: String!
    gender: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth (roles: ["admin"])
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth (roles: ["admin"])
    deleteUser(id: String!): User! @requireAuth (roles: ["admin"])
    updateRoleUser(id: String!, role: String!): User! @requireAuth (roles: ["admin"])
  }
`
