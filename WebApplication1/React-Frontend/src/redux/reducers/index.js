import { combineReducers } from "redux";
import projectsReducer from "./projectsReducer";

//combine multiple reducers into one by compartimentalizing the code
export default combineReducers({projectsReducer});