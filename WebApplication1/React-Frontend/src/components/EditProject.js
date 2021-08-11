import React from 'react';

const EditProject = (props)=>{
    return (
        <button className="btn btn-primary me-0 me-md-1" onClick={(e)=>{
            e.preventDefault();
        }}>Edit</button>
    )
}

export default EditProject;