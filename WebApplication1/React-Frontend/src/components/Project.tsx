import React, { useState, useEffect } from 'react';
import {ProjectsInterface} from "../types/projects";
import ProjectDetails from './ProjectDetails';
import {sendAjaxRequest} from "../utilities/sendAjaxRequest";

export const Project = function(){

    const [allProjects, setAllProjects] = useState([]);

    function returnProjects(data:ProjectsInterface){
        let projects:any = [];
        if(data!=null){
            for(var i =0; i< data.projects.length; i++){
                projects.push(<ProjectDetails key={i} details={data.projects[i]}/>);
            }
            setAllProjects(projects);
        }
    }

    useEffect(() => {
        sendAjaxRequest("https://webapplication120210914120117.azurewebsites.net/api/values",returnProjects,null);
    });

    return (     
        <div className="row">
        {allProjects.map((item:any)=>{
            return item;
        })}
        </div>     
   );
};
