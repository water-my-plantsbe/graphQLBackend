const { gql } = require("apollo-server-express");

exports.typeDefsPlants = gql`
  # type Plant {
  #   name
  #   description
  #   url
  #   water_per_week
  #   sunlight
  #   temperature
  #   difficulty
  #   size
  #   last_water
  # }
  type Mutation {
    addPlant(
      name: String!
      url: String
      description: String!
      water_per_week: Int
      sunlight: String
      temperature: String
      difficulty: String
      size: String
      last_water: String
    ): Plant
  }
  type Plant {
    success: Boolean
  }
`;
