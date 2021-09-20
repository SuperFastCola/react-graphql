import { ACCESS_TOKEN, EDIT_PROJECT } from "./actionTypes";

//actions are added to each component by: export default connect(state,{actionname})(component) 
//payload is passed when the action function is used in the component
export const selectProject = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    console.log(payload);
    return {
      type: EDIT_PROJECT,
      "project":payload
    }
  }

export const accessToken = payload => {
    //payload is the data passed as a parameter
    //type is used in swicth block of the reducer
    console.log("seting access token",payload);
    return {
      type: ACCESS_TOKEN,
      "accessToken":payload
    }
}
