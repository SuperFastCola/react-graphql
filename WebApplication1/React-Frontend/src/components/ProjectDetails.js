import React, {Fragment } from 'react';
import UpdateProject from './UpdateProjectButton';
import EditProject from './EditProjectButton';
import {ProjectDetailsDisplay,ProjectDetailsEdit} from "./ProjectDetailsDisplay";
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";

class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.displayButton = this.displayButton.bind(this);
        this.displayInfoType = this.displayInfoType.bind(this);
        this.state = {editing:false};
    }

    displayButton(){
        if(this.props.store.selectedProject!=null && this.props.store.selectedProject.id === this.props.details.id){
            return  <UpdateProject details={this.props.details}/>
        }
        return <EditProject details={this.props.details}/>
    }

    displayInfoType(){
        if(this.props.store.selectedProject!=null && this.props.store.selectedProject.id === this.props.details.id){
            return <ProjectDetailsEdit details={this.props.details}/>
        }
        else{
            return <ProjectDetailsDisplay details={this.props.details}/>
        }
        
    }
    render() {  
        return (
            <div className="col-12 col-md-6 my-3 my-md-4">
                {this.displayInfoType()}   
                <div>               
                    {this.displayButton()}               
                </div>
            </div>

            )
    }
}

export default connect(mapStore,null)(ProjectDetails)
