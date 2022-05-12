import React from 'react';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import {selectProject} from "../redux/actions";


interface Props{
    details:any;
    buttonName: string;
    selectProject?(payload:Props):any;
}

class EditProject extends React.Component<Props> {
    constructor(props:Props){
        super(props);
        this.chooseProject = this.chooseProject.bind(this);
    }

    chooseProject(e:any){
        if(this.props.selectProject!==undefined){
            this.props.selectProject(this.props.details);
        }
    }

    render() {       
        return (
            <button className="btn btn-primary me-0 me-md-1" data-name={this.props.buttonName} onClick={this.chooseProject}>Edit</button>
        )
    }
}

export default connect(mapStore,{selectProject})(EditProject)