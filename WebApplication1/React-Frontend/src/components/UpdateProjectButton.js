import React, {useEffect} from 'react';
import { useMutation } from "react-apollo";
import gql from "graphql-tag";

const MUTATION_QUERY = gql`
    mutation ($projectId: Int!, $projectData: UpdateProject!) {
        updateProject(project: $projectData, id: $projectId){
            ...projectFields
        }
    }

    fragment projectFields on Project {
        id
        name
        description
        role
        tech
        image
        url{
            link,
            text
        }
        projid
        type
    }
`;

const UpdateProject = (props)=>{
    //const project = useSelector(state => state.projectsReducer.selectedProject);
    // const dispatch = useDispatch();
    // dispatch(selectProject(null));       
    
    const [updateProjectOnSubmit, { data, loading, error }] = useMutation(MUTATION_QUERY);
    // if (loading) return <p>Loading</p>;
    // if (error) return <p>An error occurred</p>;
    if (data){
        props.afterUpdate(data);
    }

    function sendDataOnCLick(e){
        e.preventDefault();     
        //https://stackoverflow.com/questions/47211778/cleaning-unwanted-fields-from-graphql-responses/51380645#51380645
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value)
        const cleanedProject = JSON.parse(JSON.stringify(props.details), omitTypename);
        updateProjectOnSubmit({variables: { projectId: cleanedProject.id, projectData: cleanedProject }});
        props.afterUpdate(e);
    }


    return (
            <button className="btn btn-primary" onClick={sendDataOnCLick}>Update</button>
    )
    
}

export default UpdateProject;