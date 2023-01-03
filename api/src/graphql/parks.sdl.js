export const schema = gql`
  type Park {
    id: String!
    name: String
    imageUrl: String
    description: String
    address: String
    workingHours: JSON
    ownerId: String
    owner: User
    governorId: String
    governor: User
    Run: [Run]!
    Checkpoint: [Checkpoint]!
    Path: [Path]!
  }

  type Query {
    parks: [Park!]! @skipAuth
    park(id: String!): Park @skipAuth
    countParks: String! @skipAuth
    parkUserOwner(userId: String!): Park! @skipAuth
    parkUserGovernors(userId: String!): [Park!]! @skipAuth
  }

  input CreateParkInput {
    name: String
    imageUrl: String
    description: String
    address: String
    workingHours: JSON
    ownerId: String
    governorId: String
  }

  input UpdateParkInput {
    name: String
    imageUrl: String
    description: String
    address: String
    workingHours: JSON
    ownerId: String
    governorId: String
  }

  type Mutation {
    createPark(input: CreateParkInput!): Park! @requireAuth
    updatePark(id: String!, input: UpdateParkInput!): Park! @requireAuth
    deletePark(id: String!): Park! @requireAuth
    # AllRunInUserOfParks(governorId: String!): String! @skipAuth
  }
`
