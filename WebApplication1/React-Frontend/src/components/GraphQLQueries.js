import gql from "graphql-tag";
export const PROJECTS_QUERY = gql`
     query {
        projects{
            ...projectFields
        }
    }

    fragment projectFields on Project {
        id
        name
        description
        role
        tech
        image
        url{
            link,
            text
        }
        projid
        type
    }
`;