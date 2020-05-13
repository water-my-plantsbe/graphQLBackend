exports.resolversPlants = {
  Mutation: {
    addPlant: async (root, args, { Plant }) => {
      return { success: True };
    },
  },
};
