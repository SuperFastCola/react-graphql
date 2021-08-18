import React from 'react';
import { Query } from "react-apollo";
import { PROJECTS_QUERY } from "./GraphQLQueries";
import {ProjectsInterface} from "../types/projects";
import ProjectDetails from './ProjectDetails';


function returnProjects(data:ProjectsInterface){
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
        (projects:any) => {
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