import React, {Fragment } from 'react';
import UpdateProject from './UpdateProjectButton';
import { EDIT_PROJECT } from "../redux/actionTypes";
import { selectProject } from "../redux/actions";
import {connect} from 'react-redux';

class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {edit:false};
        this.editProject = this.editProject.bind(this);
    }

    editProject(){
        this.setState({edit:true});
        this.props.selectProject(this.props.details);
    }

    render() {
        return (
            <div className="col-12 col-md-6 my-3 my-md-4">
            <h2 className="text-capitalize">{this.props.details.name}</h2>
            <h5>{this.props.details.role}</h5>
            <p>{this.props.details.description}</p>
                <div>
                <button className="btn btn-primary me-0 me-md-1" onClick={()=> this.editProject() }>Edit</button>
                <UpdateProject/>
                </div>
            </div>

            )
    }
}

const mapStateToProps = function(store){
	return {"store":store};		
}

export default connect(mapStateToProps,{selectProject})(ProjectDetails)
