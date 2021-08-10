import React, {Fragment } from 'react';
import UpdateCourse from './UpdateCourse';

class CourseProfile extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props);

    }
    render() {
      return (
            <Fragment>
                <div>
                <h1>{this.props.details.title}</h1>
                <h6>{this.props.details.author}</h6>
                <div>{this.props.details.description}</div>
                </div>

                <UpdateCourse details={this.props.details} />
            </Fragment>
        )
    }
}

export default CourseProfile;