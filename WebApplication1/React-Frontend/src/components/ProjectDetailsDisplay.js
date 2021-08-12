import React, { Fragment } from 'react';
import EditProject from './EditProjectButton';
import UpdateProject from './UpdateProjectButton';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import {selectProject} from "../redux/actions";

class ProjectDetailsDisplay extends React.Component {
    render() {
        return (
            <Fragment>
                <h2 className="text-capitalize">{this.props.details.name}</h2>
                <h5>{this.props.details.role}</h5>
                <p>{this.props.details.description}</p>
                <div>
                <EditProject details={this.props.details}/>
                </div>
            </Fragment>
        )
    }
}
export {ProjectDetailsDisplay};

class ProjectDetailsEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.details};        
        this.changeProperty = this.changeProperty.bind(this);
        this.createFormLines = this.createFormLines.bind(this);
        this.afterUpdateHandler = this.afterUpdateHandler.bind(this);
    }

    changeProperty(e){
        e.preventDefault();
        var tmp = {};
        tmp[e.target.name] = e.target.value;
        this.setState(tmp);
    }

    afterUpdateHandler(){
        this.props.selectProject(null);
    }

    createFormLines(){
        var formLines = [];
        var i =0;
        for (const property in this.state) {
            if(!property.match(/(^id$)|projid|url|_/)){
                formLines.push(
                    <div key={++i}>
                        <label className="form-label text-capitalize">{property}</label>
                        {
                            (   
                                property.match(/description|tech/)?
                                <textarea className="form-control" name={property} defaultValue={this.state[property]} onChange={this.changeProperty}/>
                                :
                                <input className="form-control" type="text" name={property} defaultValue={this.state[property]} onChange={this.changeProperty}/>
                            )
                        }
                        
                        
                    </div>
                );
            }
        }

        return formLines;
    }

    render() {
        return (
            <Fragment>
            <form className="mb-3 mb-md-4">
                {this.createFormLines()}
            </form>
            <div>
                <UpdateProject details={this.state} afterUpdate={this.afterUpdateHandler}/>
                <button className="btn btn-warning ms-0 ms-md-1" onClick={this.afterUpdateHandler}>Cancel</button>
            </div>       
            </Fragment>
        )
    }
}

export const ProjectDetailsEdit = connect(mapStore,{selectProject})(ProjectDetailsEditComponent);

