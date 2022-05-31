import {connect} from 'react-redux';
import React from "react";
import { mapStore } from "../redux/mapStore";
import {setErrorMessage, storeProjects} from "../redux/actions";
import {ProjectDefinition, ProjectsInterface} from "../types/projects";
import { sendAjaxRequest } from '../utilities/sendAjaxRequest';
import ProjectDetails from './ProjectDetails';

type Props = {
    projects?:ProjectsInterface;
    storeProjects?(payload:any):any;
    setErrorMessage?(payload:any):any;
}

type State =  { 
    allProjects: ProjectDefinition[]
};

class ProjectBase extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.returnProjects = this.returnProjects.bind(this);
    }

    componentDidMount() {
        if(this.props.projects === undefined){
            try{
                sendAjaxRequest("https://localhost:44311//api/values","GET",undefined,this.returnProjects);
            }
            catch(e){
                throw new Error(`Error: ${e}`);
            }
        }
    }

    returnProjects(data:ProjectsInterface){
        if(data!=null && data.projects!==undefined){
            if( this.props.storeProjects!==undefined){
                this.props.storeProjects(data.projects);
            }
        }
        else{
            if( this.props.setErrorMessage!==undefined){
                this.props.setErrorMessage("Something went wrong");
            }
        }

    }
    render() {  
        var projectholder:any = [];

        if(this.props.projects!==undefined){
            for (const [key, value] of Object.entries(this.props.projects)) {
                projectholder.push(<ProjectDetails key={key} details={value}/>);
            }
        }
        return (  
        <div className="row">
            {projectholder.map((item:any)=>{
                return item;
            })} 
        </div>
        )     
    }
};

export const Project = connect(mapStore,{storeProjects,setErrorMessage})(ProjectBase);
