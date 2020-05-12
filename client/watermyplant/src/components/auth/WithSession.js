import React from "react";
import { Query } from "react-apollo";

const WithSession = (Component) => (props) => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, error, refetch }) => {
      if (loading) return null;
      return <Component {...props} refetch={refetch} session={data} />;
    }}
  </Query>
);

export default WithSession;
