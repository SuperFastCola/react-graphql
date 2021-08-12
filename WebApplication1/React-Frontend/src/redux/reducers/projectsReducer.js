import { EDIT_PROJECT } from "../actionTypes";

//when the store is created createStore(rootReducer)
//this initialstate is exported when the reducers are combined in the reducers/index.js combineReducers({projectsReducer});
const initialState = {
  selectedProject: null,
  projectEdit: null
};

const projectsReducer = function(state = initialState, action) {
  //switches by the constant 
  switch (action.type) {
    case EDIT_PROJECT: {
      //combines current state with payload or parameter passed by action
      return {...state, selectedProject: action.project };
    }
  
    default:
      return state;
  }
}

export default projectsReducer;
 