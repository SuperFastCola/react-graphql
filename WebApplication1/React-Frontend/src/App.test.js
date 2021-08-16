import renderer from 'react-test-renderer';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Project from "./components/Project";

test('Initial Test', () => {
  
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
  });

  const component = renderer.create
    (<ApolloProvider client={client}>
      <div className="container">
        <Project/>
      </div>
      </ApolloProvider>
  
  )

  const tree = component.toTree();
  expect(tree).toHaveProperty("props");
});
