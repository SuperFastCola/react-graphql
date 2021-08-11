import React, {Fragment } from 'react';
import UpdateCourse from './UpdateCourse';

class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.details);

    }
    render() {
      return (
            <Fragment>
                <div>
                <h1>{this.props.details.name}</h1>
                <h6>{this.props.details.role}</h6>
                <div>{this.props.details.description}</div>
                </div>

                <UpdateCourse details={this.props.details} />
            </Fragment>
        )
    }
}

export default ProjectDetails;