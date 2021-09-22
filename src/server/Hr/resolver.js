// const QueryResolvers = {};

const MutationResolvers = {
  registerHR: () => "Registering HR",
  loginHR: () => "Logging in HR",
};

const hrResolvers = {
  // Query: QueryResolvers,
  Mutation: MutationResolvers,
};

export default hrResolvers;
