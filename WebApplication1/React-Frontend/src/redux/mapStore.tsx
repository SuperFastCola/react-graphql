//passed to redux connect function, the store is passed in as a parameter
//objects passed in is the reducer
//have to desstructure the passed in state and return thobject
export const mapStore = (state:any) => {
    const {projects,selectedProject,accessToken} = state.projectsReducer;
    return {...state,projects,selectedProject,accessToken};		
}