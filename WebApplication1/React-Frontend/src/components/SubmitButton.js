import React from 'react';
import { useMutation } from "react-apollo";
import gql from "graphql-tag";

const MUTATION_QUERY = gql`
    mutation updateCourseTopic($id: Int!, $topic: String!) {
        updateCourseTopic(id: $id, topic: $topic) {
            ... courseFields
        }
    }

    fragment courseFields on Course {
        title
        author
        description
        topic
        url
    }
`;

const Submit = (props)=>{
    const [updateCourseTopicOnSubmit, { data, loading, error }] = useMutation(MUTATION_QUERY);
    if (loading) return <p>Loading</p>;
    if (error) return <p>An error occurred</p>;

    if (data){
        console.log(data);
    }
    

    return (
        <button onClick={(e)=>{
            e.preventDefault();
            updateCourseTopicOnSubmit({variables: { id: props.id, topic: String(props.topic) }});
        }}>Submit</button>
    )
}

export default Submit;