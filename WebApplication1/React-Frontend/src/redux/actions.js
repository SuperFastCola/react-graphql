import { EDIT_PROJECT } from "./actionTypes";

//actions are added to each component by: export default connect(state,{actionname})(component) 
//payload is passed when the action function is used in the component
export const selectProject = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    return {
      type: EDIT_PROJECT,
      "project":payload
    }
  }
