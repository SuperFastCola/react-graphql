import './App.css';
import {Project} from "./components/Project";
import { PageLayout } from './layouts/PageLayout';

function App() {

  return (
    <div className="container">
      <PageLayout>
        <Project/>
      </PageLayout>
      
    </div>
  );
}

export default App;
