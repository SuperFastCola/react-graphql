import React, { Fragment } from 'react';
import EditProject from './EditProjectButton';
import UpdateProject from './UpdateProjectButton';
import {connect} from 'react-redux';
import {mapStore} from "../redux/mapStore";
import {selectProject,updateProject} from "../redux/actions";
import CancelEdit from './CancelEdit';
import {Image} from './Image';
import {Image as ProjectImage} from "../types/projects";


type Props = {
    details:any;
    selectProject?(payload:any):any;
    updateProject?(payload:any):any;
}

type ProjectDefinition ={
    url: string[]
    id: number;
    name: string;
    description: string;
    role: string;
    tech: string;
    image:string[];
    projid:string;
    type: string[];
}

type DraggedItem= {
    className: string;
    pageY:number;
}

type State = ProjectDefinition & DraggedItem;

class ProjectDetailsDisplay extends React.Component<Props, State> {
    render() {
        return (
            <Fragment>
                <h2 className="text-capitalize">{this.props.details.name}</h2>
                <h5 data-testid="project-role">{this.props.details.role}</h5>
                <p>{this.props.details.description}</p>
                <div>
                <EditProject details={this.props.details} buttonName="Edit"/>
                </div>
            </Fragment>
        )
    }
}
export {ProjectDetailsDisplay};

class ProjectDetailsEditComponent extends React.Component<Props, State> {
    formRef: React.RefObject<HTMLFormElement>;
    imageList: React.RefObject<HTMLDivElement>;
    constructor(props:Props) {
        super(props);
        this.state = {...this.props.details };        
        this.formRef = React.createRef();
        this.imageList = React.createRef();
        this.changeProperty = this.changeProperty.bind(this);
        this.createFormLines = this.createFormLines.bind(this);
        this.afterUpdateHandler = this.afterUpdateHandler.bind(this);
        this.changeUrlProperty = this.changeUrlProperty.bind(this);
        this.addURLFormElement = this.addURLFormElement.bind(this);
        this.addURLButton = this.addURLButton.bind(this);
        this.removeURLButton = this.removeURLButton.bind(this);
        this.removeURLFormElement = this.removeURLFormElement.bind(this);
        this.updateProjectInStore = this.updateProjectInStore.bind(this);
        this.dropOverHandler = this.dropOverHandler.bind(this);
        this.dropStartHandler = this.dropStartHandler.bind(this);
        this.dropEndHandler = this.dropEndHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    changeProperty(e:any){
        e.preventDefault();
        var tmp:any = {};
        tmp[e.target.name] = e.target.name === "type" ? (e.target.value.replace(" ","")).split(",") : e.target.value;
        this.setState(tmp);
        this.updateProjectInStore();
    }

    changeUrlProperty(e:any){
        e.preventDefault();
        var tmpUrl:any = [...this.state.url];
        var index = e.target.dataset["index"];
        tmpUrl[index][e.target.name] = e.target.value;
        this.setState({url:[...tmpUrl]});
        this.updateProjectInStore();
    }

    afterUpdateHandler(dataset:any,data:any){
        
        if(dataset["name"] !== undefined){
            var buttonName = String(dataset["name"]).toLowerCase();
            switch(buttonName){
                case "update":
                    if(this.props.updateProject!==undefined && data !== undefined){
                        this.props.updateProject(data);
                    }
                break;
            }
        }

        if(this.props.selectProject){
            this.props.selectProject(undefined);
        }
    }

    addURLFormElement(e:any){
        e.preventDefault();
        var tmpUrl:any = [];
        if(this.state.url!=null){
            tmpUrl = [...this.state.url];
        }

        tmpUrl.push({
            "link":"",
            "text":"",
        })        
        this.setState({url:[...tmpUrl]});
    }

    removeURLFormElement(e:any){
        e.preventDefault();
        
        var tmpUrl = this.state.url.filter( (item,index) => {
            if(index !== Number(e.target.dataset["index"])){
                return item;
            }
            return null;
        });
        this.setState({url:[...tmpUrl]});
        console.log(this.state);
        this.updateProjectInStore();

    }

    addURLButton(){
        return(
            <button className="btn btn-light btn-sm my-2 my-md-3" onClick={this.addURLFormElement}>Add Url</button>
        )
    }

    dropStartHandler(e:any){
        const dataList = e.dataTransfer.items;
        dataList.add(String(e.target.innerHTML),"text/html");
        var targetClass = e.target.classList.value.match(/image-group-[0-9]{1,2}/);
        
        if(targetClass!==null){
            this.setState({"className":targetClass[0]});
        }
    }

    
    dropEndHandler(e:any){
        const dataList = e.dataTransfer.items;
        // Clear any remaining drag data
        dataList.clear();

        var children = this.imageList.current?.querySelectorAll("div.image-group")!;
        var targetedChild = this.imageList.current?.querySelector(`.${this.state.className}`);
        var elementsOrder = [];

        //strip all flex-order properties from elements
        for (const [index, element] of children.entries()) {
            let currentImage:HTMLDivElement = element as HTMLDivElement;

            //add non target to array collection
            if(currentImage.classList.value!==targetedChild?.classList.value){
                elementsOrder[currentImage.offsetTop] = currentImage;
            }
            else{
                elementsOrder[e.pageY] = targetedChild;
            }         
        }

        var newProductsOrder:any = [];
        var originalImages = this.props.details.image;
        var orderIncrement:number = 0;

        elementsOrder.forEach( (item,index)=>{
            //cast item to HTML Div Element
            var imageHtmlItem:HTMLDivElement = item as HTMLDivElement;
            
            //create clone of original image data at data-index property on imageHtmlItem
            var originalImageData:ProjectImage = JSON.parse(JSON.stringify(originalImages[Number(imageHtmlItem.dataset.index)]));

            //set new order property for image
            var newImageData:ProjectImage = Object.assign(originalImageData,{"order":++orderIncrement});

            //push into new array
            newProductsOrder.push(newImageData);
        });

        this.setState({...Object.assign(this.props.details,{"image":newProductsOrder})});


    }

    dropOverHandler(e:any){
        e.preventDefault();
        // Set the dropEffect to move
        e.dataTransfer.dropEffect = "move"
    }

    dropHandler(e:any){
        e.preventDefault();

        const data = e.dataTransfer.items;
        for(var i in data){

            if(data[i].kind === "string"){
                data[i].getAsString(function (s: any){
                    console.log(s);
                  });
            }
        }
    }

    removeURLButton(index:number){
        return(
            <div className="col-12"><button className="btn btn-danger btn-sm my-2 my-md-3" data-index={index} onClick={this.removeURLFormElement}>Remove</button></div>
        )
    }

    createFormLines(){
        var formLines = [];
        var i =0;
        for (const property in this.state) {

            if(!property.match(/(^id$)|projid|image|url|_/)){
                formLines.push(
                    <div key={++i} className="mb-2">
                        <label className="form-label text-capitalize">{property}</label>
                        {
                            (   
                                property.match(/description|tech/)?
                                <textarea className="form-control form-control-sm" name={property} defaultValue={this.state[property as keyof ProjectDefinition]} onChange={this.changeProperty}/>
                                :
                                <input className="form-control form-control-sm" type="text" name={property} defaultValue={this.state[property as keyof ProjectDefinition]} onChange={this.changeProperty}/>
                            )
                        }
                    </div>
                );
            }
            else if(property==="image" ){
                let imagesObject:any =[];
                if(this.state[property]!=null && this.state[property].length > 0){
                    imagesObject = this.state[property].map( (item:any, index) =>{
                        return( 
                            <Image sizes={item} startDrag={this.dropStartHandler} endDrag={this.dropEndHandler} order={item.order} indice={index} key={index} />
                        )
                    });
                }
                else{
                    var inputProps ={
                        "S": null,
                        "M": null,
                        "L": null,
                        "Xl": null
                    };
                    imagesObject.push(<Image sizes={inputProps} startDrag={this.dropStartHandler} endDrag={this.dropEndHandler} order={1} indice={0} key={0} />);
                }
                formLines.push(
                    <div key="imagesarray" ref={this.imageList} className="d-flex flex-column border p-4 my-3" onDragOver={this.dropOverHandler} onDrop={this.dropHandler} >
                        {imagesObject}
                    </div>
                );
            }

            else if(property==="url"){
                    let urlsObject:any =[]; 
                    if(this.state[property]!=null){
                        urlsObject = this.state[property].map( (u:any, index) =>{
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
                        <div key="urlsarray" className="border p-4 my-3">{urlsObject}
                        {this.addURLButton()}
                        </div>
                    );
            }
        }

        return formLines;
    }

    updateProjectInStore(){
        if(this.props.updateProject!==undefined){
            this.props.updateProject(this.state);
        }
    }

    render() {
        return (
            <Fragment>
            <form className="mb-3 mb-md-4" ref={this.formRef}>
                {this.createFormLines()}
            </form>
             <div>
                {<UpdateProject details={this.state} buttonName="Update" afterUpdate={this.afterUpdateHandler}/>}
                {<CancelEdit buttonName="Cancel" afterUpdate={this.afterUpdateHandler}/>}
            </div>
            </Fragment>
        )
    }
}

export const ProjectDetailsEdit = connect(mapStore,{selectProject,updateProject})(ProjectDetailsEditComponent);

