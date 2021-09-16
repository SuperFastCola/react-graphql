import React, { Fragment } from 'react';
import EditProject from './EditProjectButton';
//import UpdateProject from './UpdateProjectButton';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import {selectProject} from "../redux/actions";

class ProjectDetailsDisplay extends React.Component {
    render() {
        return (
            <Fragment>
                <h2 className="text-capitalize">{this.props.details.name}</h2>
                <h5 data-testid="project-role">{this.props.details.role}</h5>
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
        this.state = {...this.props.details };        
        this.formRef = React.createRef();
        this.changeProperty = this.changeProperty.bind(this);
        this.createFormLines = this.createFormLines.bind(this);
        this.afterUpdateHandler = this.afterUpdateHandler.bind(this);
        this.changeUrlProperty = this.changeUrlProperty.bind(this);
        this.addURLFormElement = this.addURLFormElement.bind(this);
        this.addURLButton = this.addURLButton.bind(this);
        this.removeURLButton = this.removeURLButton.bind(this);
        this.removeURLFormElement = this.removeURLFormElement.bind(this);
    }

    changeProperty(e){
        e.preventDefault();
        var tmp = {};
        tmp[e.target.name] = e.target.name === "type" ? (e.target.value.replace(" ","")).split(",") : e.target.value;
        this.setState(tmp);
    }

    changeUrlProperty(e){
        e.preventDefault();
        var tmpUrl = [...this.state.url];
        var index = e.target.dataset["index"];
        tmpUrl[index][e.target.name] = e.target.value;
        this.setState({url:[...tmpUrl]});
    }

    afterUpdateHandler(){
        this.props.selectProject(null);
    }

    addURLFormElement(e){
        e.preventDefault();
        var tmpUrl = [];
        if(this.state.url!=null){
            tmpUrl = [...this.state.url];
        }

        tmpUrl.push({
            "link":"",
            "text":"",
        })        
        this.setState({url:[...tmpUrl]});
    }

    removeURLFormElement(e){
        e.preventDefault();
        
        var tmpUrl = this.state.url.filter( (item,index) => {
            if(index !== e.target.dataset["index"]){
                return item;
            }
            return null;
        });
        this.setState({url:[...tmpUrl]});
    }

    addURLButton(){
        return(
            <button className="btn btn-light btn-sm my-2 my-md-3" onClick={this.addURLFormElement}>Add Url</button>
        )
    }

    removeURLButton(index){
        return(
            <div className="col-12"><button className="btn btn-danger btn-sm my-2 my-md-3" data-index={index} onClick={this.removeURLFormElement}>Remove</button></div>
        )
    }

    createFormLines(){
        var formLines = [];
        var i =0;
        for (const property in this.state) {
            if(!property.match(/(^id$)|projid|url|_/)){
                formLines.push(
                    <div key={++i} className="mb-2">
                        <label className="form-label text-capitalize">{property}</label>
                        {
                            (   
                                property.match(/description|tech/)?
                                <textarea className="form-control form-control-sm" name={property} defaultValue={this.state[property]} onChange={this.changeProperty}/>
                                :
                                <input className="form-control form-control-sm" type="text" name={property} defaultValue={this.state[property]} onChange={this.changeProperty}/>
                            )
                        }
                    </div>
                );
            }
            else if(property==="url"){
                    if(this.state[property]!=null){
                        this.urlsObject = this.state[property].map( (u, index) =>{
                            return(
                                <div key={("urlitem"+ index)} className="row mb-2 border">
                                    <div className="col-12 mb-2">
                                        <label className="form-label text-capitalize">Url</label>
                                        <input className="form-control form-control-sm" type="text" name={"link"} data-index={index} defaultValue={u.link} onChange={this.changeUrlProperty}/>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label text-capitalize">Url Link Text</label>
                                        <input className="form-control form-control-sm" type="text" name={"text"} data-index={index} defaultValue={u.text} onChange={this.changeUrlProperty}/>
                                    </div>
                                    {this.removeURLButton(index)}
                                </div>
                            )
                        });
                    }
                    
                    formLines.push(
                        <div key="urlsarray" className="border p-4 my-3">{this.urlsObject}
                        {this.addURLButton()}
                        </div>
                    );
            }
        }

        return formLines;
    }

    render() {
        return (
            <Fragment>
            <form className="mb-3 mb-md-4" ref={this.formRef}>
                {this.createFormLines()}
            </form>
             <div>
                {/* <UpdateProject details={this.state} afterUpdate={this.afterUpdateHandler}/> */}
                <button className="btn btn-warning ms-0 ms-md-1" onClick={this.afterUpdateHandler}>Cancel</button>
            </div>
            </Fragment>
        )
    }
}

export const ProjectDetailsEdit = connect(mapStore,{selectProject})(ProjectDetailsEditComponent);

