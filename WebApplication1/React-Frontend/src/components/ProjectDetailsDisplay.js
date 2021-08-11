import React, { Fragment } from 'react';

export class ProjectDetailsDisplay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                <h2 className="text-capitalize">{this.props.details.name}</h2>
                <h5>{this.props.details.role}</h5>
                <p>{this.props.details.description}</p>
            </Fragment>
        )
    }
}


export class ProjectDetailsEdit extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form className="mb-3 mb-md-4">
                <div>
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" name="name" defaultValue={this.props.details.name}/>
                </div>

                <div>
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" name="role" defaultValue={this.props.details.role}/>
                </div>
            
                <div>
                    <label className="form-label">Description</label>
                    <textarea name="description"  className="form-control" defaultValue={this.props.details.description}/>
                </div>
            </form>
        )
    }
}

