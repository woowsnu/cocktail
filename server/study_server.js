import { ApolloServer, gql } from "apollo-server";

let musics = [
  {
    id: "1",
    title: "good parts",
    userId: "1",
  },
  {
    id: "2",
    title: "antifragile",
    userId: "1",
  },
  {
    id: "3",
    title: "imqurities",
    userId: "2",
  },
];

const users = [
  { id: "1", firstName: "moon", lastName: "sun" },
  { id: "2", firstName: "kang", lastName: "min" },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    fistName + lastName
    """
    fullName: String!
  }
  """
  Music object represents a resource for a Music
  """
  type Music {
    id: ID!
    title: String!
    author: User
  }
  type Query {
    allUsers: [User!]!
    allMusics: [Music!]!
    music(id: ID): Music
  }
  type Mutation {
    postMusic(title: String!, authorId: ID!): Music!
    deleteMusic(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allUsers() {
      return users;
    },
    allMusics() {
      return musics;
    },
    music(root, { id }) {
      return musics.find((music) => music.id === id);
    },
  },
  Mutation: {
    postMusic(_, { title, author }) {
      const newMusic = {
        id: musics.length + 1,
        title,
      };
      musics.push(newMusic);
      return newMusic;
    },
    deleteMusic(_, { id }) {
      const music = musics.find((music) => music.id === id);
      if (!music) return false;
      musics = musics.filter((music) => music.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      return `${firstName} ${lastName}`;
    },
  },
  Music: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    },
  },
};

const server2 = new ApolloServer({ typeDefs, resolvers });

server2.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
