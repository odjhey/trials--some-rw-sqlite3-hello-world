export const schema = gql`
  type Hello {
    id: Int!
    message: String!
  }

  type Query {
    hellos: [Hello!]! @requireAuth
    hello(id: Int!): Hello @requireAuth
  }

  input CreateHelloInput {
    message: String!
  }

  input UpdateHelloInput {
    message: String
  }

  type Mutation {
    createHello(input: CreateHelloInput!): Hello! @requireAuth
    updateHello(id: Int!, input: UpdateHelloInput!): Hello! @requireAuth
    deleteHello(id: Int!): Hello! @requireAuth
  }
`
