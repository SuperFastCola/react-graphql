import React, { Fragment } from 'react';
class ProjectDetailsEdit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <label>Name</label>
                <input type="text" name="name" value={this.props.details.name}/>

                <label>Role</label>
                <input type="text" name="role" value={this.props.details.role}/>

                <label>Description</label>
                <textarea name="description">
                    {this.props.details.description}
                </textarea>
                
            </Fragment>
        )
    }
}

export default ProjectDetailsEdit;
