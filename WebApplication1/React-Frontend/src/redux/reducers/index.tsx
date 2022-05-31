import { combineReducers } from "redux";
import { EDIT_PROJECT, ACCESS_TOKEN, UPDATE_PROJECT, STORE_PROJECTS, UPDATE_PROJECT_IMAGE, GENERATE_ERROR } from "../actionTypes";

const initialState = {
      accessToken: null,
      selectedProject: undefined,
      projects: undefined,
      errorMessage: null,
};

const projectsReducer = function(state = initialState, action:any) {
  //switches by the constant 
  switch (action.type) {
    case ACCESS_TOKEN: {
      const newState = {...state, accessToken: action.accessToken};
      return newState;
    }

    case STORE_PROJECTS: {
      var object =  {...state, projects: action.projects };
      return object;
    }

    case EDIT_PROJECT: {
      return {...state, selectedProject: action.project };
    }

    case UPDATE_PROJECT_IMAGE: { 
      //needs to be implemented
      console.log("UPDATE_PROJECT_IMAGE",state.selectedProject,action);

      return state;
    }

    case GENERATE_ERROR: { 
      return {...state, errorMessage: action.errorMessage };
    }

    case UPDATE_PROJECT: {
      var projects = [];
      
      for (const [key, value] of Object.entries(Array(state.projects)[0])) {
        if(Object(value).id === action.projectToUpdate.id){
          projects.push(action.projectToUpdate);
        }else{
          projects.push(value);
        }
      };

      return {...state, projects: projects };
    }
  
    default:
      return state;
  }
}

//combine multiple reducers into one by compartimentalizing the code
export default combineReducers({projectsReducer});