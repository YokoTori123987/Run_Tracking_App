export const schema = gql`
  type Path {
    id: String!
    name: String!
    parkId: String!
    park: Park!
    distance: Float!
    Lap: [Lap]!
    PathCheckpoint: [PathCheckpoint]!
  }

  type Query {
    paths: [Path!]! @requireAuth
    path(id: String!): Path @requireAuth
  }

  input CreatePathInput {
    name: String!
    parkId: String!
    distance: Float!
  }

  input UpdatePathInput {
    name: String
    parkId: String
    distance: Float
  }

  type Mutation {
    createPath(input: CreatePathInput!): Path! @requireAuth
    updatePath(id: String!, input: UpdatePathInput!): Path! @requireAuth
    deletePath(id: String!): Path! @requireAuth
  }
`
