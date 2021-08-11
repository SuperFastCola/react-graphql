import React, { Fragment , useState, useEffect } from 'react';
import Submit from './SubmitButton';

const UpdateCourse = (props) =>{
    const [topic, setTopic] = useState(0);
    
    
    const divStyle = {
        marginTop: "20px",
        display: "flex", 
        flexDirection: "column"
    };
    
    return (
        <Fragment>
            <form style={divStyle}>
                {
                    /*
                <input type="test" value={(topic!=0)?topic:props.details.topic} onChange={(e)=>{
                    setTopic(e.target.value);
                }}/>
                */
                }
                <Submit id={props.details.id} topic={topic}/>
            </form>
        </Fragment>
    )
}

export default UpdateCourse;