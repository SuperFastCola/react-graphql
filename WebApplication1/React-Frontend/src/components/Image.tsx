import React from 'react';
import { connect } from 'react-redux';
import {updateProject } from '../redux/actions';
import { mapStore } from '../redux/mapStore';
import { ProjectDefinition } from '../types/projects';
import { sendAjaxRequest } from '../utilities/sendAjaxRequest';

interface Props{
    sizes:any;
    indice:number;
    order: number;
    projectID:number;
    selectedProject?: ProjectDefinition;
    startDrag?(payload:any):any;
    endDrag?(payload:any):any;
    updateProject?(payload:any):any;
}

interface State{
    show:boolean;
}

class ImageBase extends React.Component<Props,State> {
    imageDivRef: React.RefObject<HTMLDivElement>;
    fileRef: React.RefObject<HTMLInputElement>;
    fileData:any;

    constructor(props:Props) {
        super(props);
        this.fileRef = React.createRef();
        this.imageDivRef = React.createRef();
        this.state = {show:false};
        this.sendNewFile = this.sendNewFile.bind(this);
        this.afterUpload = this.afterUpload.bind(this);
        this.createBlob = this.createBlob.bind(this);
        this.showHide = this.showHide.bind(this);
    }

    afterUpload(){
        var project = this.props.selectedProject;
        if(project?.image!==undefined && this.fileRef.current?.name!==undefined && this.fileRef.current?.files!==null){
            project.image[this.props.indice] = Object.assign({...project.image[this.props.indice],[this.fileRef.current.name]:this.fileRef.current.files[0].name});
            if(this.props.updateProject!==undefined){
                this.props.updateProject(project);
            }
        }
    }

    createBlob(e:any){
        if(this.fileRef.current!==null && this.fileRef.current.files!==null){  
            const blob = new Blob([e.target.result], {type : this.fileRef.current.files[0].type});
            var imageData = new FormData();
            imageData.append(this.fileRef.current.name,blob, this.fileRef.current.files[0].name);
            sendAjaxRequest("https://localhost:44311/api/upload/","POST",imageData,this.afterUpload.bind(this));
        }
    }


    sendNewFile(e:any){
        e.preventDefault();
        if(this.fileRef.current!==null){              
                if(this.fileRef.current.files!==null){
                    var fileReader = new FileReader();
                    fileReader.addEventListener("loadend",this.createBlob);
                    fileReader.readAsArrayBuffer(this.fileRef.current.files[0]);
                }
        }
    }

    showHide(e:any){
        e.preventDefault();
        this.setState({show:!this.state.show});
    }

    render() {      
        var imagesSizes:any = [];
        var collapseStyle = `collapse ${(this.state.show?"show":"")}`;
        var collapseText = (this.state.show?"hide":"show");
        var orderClass= (this.props.order)?`flex-order-${this.props.order}`:"";
        var holderCSS = `image-group border mb-3 px-3 ${orderClass} image-group-${this.props.order}`;
        for(const [key, value] of Object.entries(this.props.sizes)){

            if(!String(key).match(/order|id/)){
                imagesSizes.push(
                        <div key={("imageItem_"+key)} className="row mx-0 mb-2 border">
                            <div className="col-12 mb-2">
                                <label className="form-label text-capitalize">{key}: {value}</label>
                                <input className="form-control form-control-sm mb-1" name={key} data-name={String(key+this.props.indice)} data-index={this.props.indice}  ref={this.fileRef} type="file" />
                                <button className="btn btn-primary" data-name={String(key+this.props.indice)} onClick={this.sendNewFile}>Upload</button>
                            </div>
                        </div>
                        );
                }
            }
        
        return (

            <div className={holderCSS} ref={this.imageDivRef} draggable="true" data-index={this.props.indice} onDragStart={this.props.startDrag} onDragEnd={this.props.endDrag}>
                <div className="d-flex my-3"><h6 className="flex-fill">Image {this.props.indice}</h6>
                <button className="btn btn-primary" onClick={this.showHide}>{collapseText}</button></div>
                <div className={collapseStyle}>{imagesSizes}</div>  
            </div>
        )
    }
}

export const Image = connect(mapStore,{updateProject})(ImageBase);
