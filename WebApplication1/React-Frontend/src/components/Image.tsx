import React from 'react';
import { sendAjaxRequest } from '../utilities/sendAjaxRequest';


interface Props{
    sizes:any;
    indice:number;
}

class Image extends React.Component<Props> {
    fileRef: React.RefObject<HTMLInputElement>;

    constructor(props:Props) {
        super(props);
        this.fileRef = React.createRef(); 
        this.sendNewFile = this.sendNewFile.bind(this);
        this.afterUpload = this.afterUpload.bind(this);
    }

    afterUpload(e:any){
        console.log(e);
    }

    sendNewFile(e:any){
        e.preventDefault();
        if(this.fileRef.current!==null){
            if(this.fileRef.current.value.length>0){
                console.log(this.fileRef.current.value);
                var fileUpload = new FormData();
                //fileUpload.append(this.fileRef.current.name, this.fileRef.current.value,"TEMP");

                console.log(this.fileRef.current.files);
                //sendAjaxRequest("https://localhost:44311/api/upload/","POST",fileUpload,this.afterUpload.bind(this,e));

            }
        }
    }

    render() {      
        var imagesSizes:any = [];
        for(const [key, value] of Object.entries(this.props.sizes)){

            if(!String(key).match(/order|id/)){
                imagesSizes.push(
                        <div key={("imageItem_"+key)} className="row mb-2 border">
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
            <div>
                {imagesSizes}
            </div>
        )
    }
}

export default Image;

// const Image = (props)=>{
//     console.log(props);
//     var imagesSizes = [];
    
//     for(var [key,value] in props.sizes){
//         return (
              
            // <picture>
            //     <source media="(min-width: 1200px)" srcset="/globalassets/digizuite/32271-350x235-crop-cdap-banner.jpg?v=4a7fb5" />
            //     <source media="(min-width: 992px)" srcset="/globalassets/digizuite/32272-290x195-crop-cdap-banner.jpg?v=4a7fb5" />
            //     <source srcset="/globalassets/digizuite/32273-330x220-crop-cdap-banner.jpg?v=4a7fb5" />
            //     <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
            // </picture>
            // </div>
        
//             <div>Image</div>
//             // <div key={("imageItem"+ index)} className="row mb-2 border">
//             //     <div className="col-12 mb-2">
//             //         <label className="form-label text-capitalize">Image</label>
//             //         <input className="form-control form-control-sm" name="image1" data-index={index} type="file" />
//             //     </div>
//             // <picture>
//             //     <source media="(min-width: 1200px)" srcset="/globalassets/digizuite/32271-350x235-crop-cdap-banner.jpg?v=4a7fb5" />
//             //     <source media="(min-width: 992px)" srcset="/globalassets/digizuite/32272-290x195-crop-cdap-banner.jpg?v=4a7fb5" />
//             //     <source srcset="/globalassets/digizuite/32273-330x220-crop-cdap-banner.jpg?v=4a7fb5" />
//             //     <img src="/media/cc0-images/painted-hand-298-332.jpg" alt="" />
//             // </picture>
//             // </div>
//         )
//     };

//     return imagesSizes;
// }

// export default Image;