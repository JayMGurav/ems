// const QueryResolvers = {};

const MutationResolvers = {
  registerEmployee: () => "Registering Employee",
  loginEmployee: () => "Logging in as Employee",
};

const employeeResolvers = {
  // Query: QueryResolvers,
  Mutation: MutationResolvers,
};

export default employeeResolvers;
