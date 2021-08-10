import './App.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Course from "./components/Course";
import { Fragment } from 'react';


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Fragment>
      <div>My first Grpah QL App</div>
      <Course/>
    </Fragment>
    </ApolloProvider>
  );
}

export default App;
