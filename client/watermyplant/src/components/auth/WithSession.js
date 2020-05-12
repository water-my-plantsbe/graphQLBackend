import React from "react";
import { Query } from "react-apollo";
import { GET_CURRENT_USER } from "../queries";
const WithSession = (Component) => (props) => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error, refetch }) => {
      console.log("With session", data);
      if (loading) return null;
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default WithSession;
