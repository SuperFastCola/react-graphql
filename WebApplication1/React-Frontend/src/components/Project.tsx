import {connect} from 'react-redux';
import React from "react";
import { mapStore } from "../redux/mapStore";
import {ProjectDefinition, ProjectsInterface} from "../types/projects";
import { sendAjaxRequest } from '../utilities/sendAjaxRequest';
import ProjectDetails from './ProjectDetails';

type Props = {
    accessToken:any;
}

type State =  { 
    allProjects: ProjectDefinition[]
};

class ProjectBase extends React.Component<Props, State> {

    constructor(props:Props){
        super(props);
        this.state = ({allProjects:[]});
        this.returnProjects = this.returnProjects.bind(this);
        //const [allProjects, setAllProjects] = useState([]);
    }

    returnProjects(data:ProjectsInterface){
        let projects:any = [];
        if(data!=null){
            for(var i =0; i< data.projects.length; i++){
                projects.push(<ProjectDetails key={i} details={data.projects[i]}/>);
            }
            this.setState({allProjects:projects});
        }
    }

    componentDidUpdate(prevProps:Props, prevState:State, snapshot:any) {

        if(this.state.allProjects.length===0 && prevProps.accessToken !==this.props.accessToken){
                //sendAjaxRequest("https://abtestcontroller.azurewebsites.net/api/values",this.returnProjects,this.props.accessToken);
                sendAjaxRequest("https://react.local/api/values",this.returnProjects,this.props.accessToken);
               
        }
    }

    render() {  
        return (  
        <div className="row">
            {(console.log("--111-",this.props))}
        {this.state.allProjects.map((item:any)=>{
            return item;
        })}
        </div>
        )     
    }
};

export const Project = connect(mapStore,null)(ProjectBase);
