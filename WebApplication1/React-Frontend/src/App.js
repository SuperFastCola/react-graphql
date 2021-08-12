import './App.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Project from "./components/Project";


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});


function App() {
  return (
    <ApolloProvider client={client}>
    <div className="container">
      <Project/>
    </div>
    </ApolloProvider>
  );
}

export default App;
