import React, { Fragment } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CourseProfile from './CourseProfile';

var courseIDs = [1,2];
const COURSES_QUERY = gql`
    query getCourseWithFragments($courseID1: Int!, $courseID2: Int!) {
        course1: course(id: $courseID1) {
            ...courseFields
        }
        course2: course(id: $courseID2) {
            ...courseFields
        }
    }

    fragment courseFields on Course {
        id
        title
        author
        description
        topic
        url
    }
`;

function returnCourses(data){
    var allcourses = [];
    for(var i in data){
        allcourses.push(<CourseProfile key={data[i].id} details={data[i]}/>);
    }
    return allcourses;
}

const Course = () => (
    <Query query={COURSES_QUERY} variables={{ courseID1:courseIDs[0], courseID2:courseIDs[1] }} >
    {       
        (courses) => {
            return (
                <Fragment>
                { returnCourses(courses.data)}
                </Fragment>
            )
        }
   }
  </Query>
);
export default Course;