import './App.css';
import {connect} from 'react-redux';
import { mapStore } from "./redux/mapStore";
import {Project} from "./components/Project";
import React from 'react';
import { ProjectsInterface } from './types/projects';
import ProjectDetails from './components/ProjectDetails';

type Props = {
  errorMessage?:null;
  projects?:ProjectsInterface;
}

class AppBase extends React.Component<Props> {

  constructor(props:Props){
    super(props);
    this.displayContent = this.displayContent.bind(this);
  }

  displayContent(){
    if(this.props.errorMessage!=null){
      return <div className="text-center mt-4"><h3>Something went wrong</h3></div>;
    }
    return;
  }

  render() {  
    return ( 
    <div className="container">
      {this.displayContent()}
      <Project/>
    </div>
    )
  
  }
}

export const App = connect(mapStore)(AppBase);
