import './App.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Project from "./components/Project";
import { Fragment } from 'react';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Fragment>
      <Project/>
    </Fragment>
    </ApolloProvider>
  );
}

export default App;
