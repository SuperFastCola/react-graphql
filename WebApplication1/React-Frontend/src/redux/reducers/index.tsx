import { combineReducers } from "redux";
import { EDIT_PROJECT, ACCESS_TOKEN } from "../actionTypes";

// const initialState = {
//     accessToken: null,
//     selectedProject: null,
//     projectEdit: null
// };

const projectsReducer = function(state = [], action:any) {
  //switches by the constant 
  switch (action.type) {
    case ACCESS_TOKEN: {
      const newState = {...state, accessToken: action.accessToken};
      return newState;
    }

    case EDIT_PROJECT: {
      return {...state, selectedProject: action.project };
    }
  
    default:
      return state;
  }
}

//combine multiple reducers into one by compartimentalizing the code
export default combineReducers({projectsReducer});