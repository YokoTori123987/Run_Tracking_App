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
    parks: [Park!]! @requireAuth
    park(id: String!): Park @requireAuth
    countParks: String! @requireAuth
    parkUserOwner(userId: String!): Park! @requireAuth
    parkUserGovernors(userId: String!): [Park!]! @requireAuth
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
