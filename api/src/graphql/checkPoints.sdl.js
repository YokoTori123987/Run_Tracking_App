export const schema = gql`
  type Checkpoint {
    id: String!
    park: Park!
    parkId: String!
    name: String!
    longitude: Float
    latitude: Float
    Log: [Log]!
    PathCheckpoint: [PathCheckpoint]!
    PrevPathCheckpoint: [PathCheckpoint]!
  }

  type Query {
    checkpoints: [Checkpoint!]! @requireAuth
    checkpoint(id: String!): Checkpoint @requireAuth
  }

  input CreateCheckpointInput {
    parkId: String!
    name: String!
    longitude: Float
    latitude: Float
  }

  input UpdateCheckpointInput {
    parkId: String
    name: String
    longitude: Float
    latitude: Float
  }

  type Mutation {
    createCheckpoint(input: CreateCheckpointInput!): Checkpoint! @requireAuth
    updateCheckpoint(id: String!, input: UpdateCheckpointInput!): Checkpoint!
      @requireAuth
    deleteCheckpoint(id: String!): Checkpoint! @requireAuth
    checkRunningPath(userId: String!, checkpointId: String!): Boolean @skipAuth
  }
`
