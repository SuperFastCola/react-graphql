import React from 'react';
//import { sendAjaxRequest } from '../utilities/sendAjaxRequest';


const UpdateProject = (props)=>{
 
    function sendDataOnCLick(e){
        e.preventDefault();     
        //https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
        const cleanedProject = JSON.parse(JSON.stringify(props.details), omitTypename);
        console.log(cleanedProject);
        //sendAjaxRequest("https://localhost:44311/api/values/" + props.details.id,"PUT",JSON.stringify(cleanedProject),props.afterUpdate.bind(this,e.target.dataset,props.details));
        //sendAjaxRequest("https://react.local/api/values","PUT",this.props.afterUpdate(e));
    }


    return (
            <button className="btn btn-primary" data-name={props.buttonName} onClick={sendDataOnCLick}>Update</button>
    )
    
}

export default UpdateProject;