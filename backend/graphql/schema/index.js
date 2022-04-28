const {buildSchema} = require('graphql');
module.exports = buildSchema(`
type User{
    _id: ID!
    email: String!
    password: String
    savedmovie: [Movie!]
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type Movie{
    _id: ID!
    adult: Boolean
    backdrop_path: String
    movieid: String!
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    vote_count: Float
    saver: [User!]
}

input UserInput{
    email: String!
    password: String!
}

input MovieInput{
    adult: Boolean
    backdrop_path: String
    movieid: String!
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    title: String
    vote_average: Float
    vote_count: Float
}

type RootQuery{
    login(email: String!, password: String!): AuthData!
    fetchmovie : User!
}

type RootMutation{
    createUser(userInput: UserInput):User
    saveMovie(movieInput: MovieInput):Movie

}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)