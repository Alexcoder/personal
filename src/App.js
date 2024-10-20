import './App.css';
import HouseTracker from './component/houseTracker';
import * as hooks from "./hooks"

function App() {

  return (
    <div className="Appx" 
     style={{display:"grid", placeContent:"center", width:"auto", minHeight:"100vh", placeItems:"initial", backgroundColor:"rgba(50, 50, 200, 0.5)"}}
      >
      <h1>{hooks.formatDate.weekDay}</h1>
     <div>{hooks.formatDate.time}</div>
     <div>{hooks.formatDate.fullDate()}</div>

     <HouseTracker/>
     

    </div>
  );
}

export default App;
