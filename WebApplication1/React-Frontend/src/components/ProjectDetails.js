import React from 'react';
import {ProjectDetailsDisplay,ProjectDetailsEdit} from "./ProjectDetailsDisplay";
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";

class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.displayInfoType = this.displayInfoType.bind(this);
        this.state = {editing:false};
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
            </div>

            )
    }
}

export default connect(mapStore,null)(ProjectDetails)
