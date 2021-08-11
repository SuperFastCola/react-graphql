import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ProjectDetails from './ProjectDetails';

const PROJECTS_QUERY = gql`
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

function returnProjects(data){
    var allprojects = [];

    if(data!=null){
        for(var i =0; i< data.projects.length; i++){
            allprojects.push(<ProjectDetails key={i} details={data.projects[i]}/>);
        }
    }
    return allprojects;
    
}

const Project = () => (
    //<Query query={PROJECTS_QUERY} variables={{ courseID1:courseIDs[0], courseID2:courseIDs[1] }} >
    <Query query={PROJECTS_QUERY} >
    {       
        (projects) => {
            return (
                <div className="row">
                { returnProjects(projects.data)}
                </div>
            )
        }
   }
  </Query>
);
export default Project;