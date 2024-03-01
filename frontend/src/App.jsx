import Monitor1 from "./components/monitor1";
import Monitor2 from "./components/monitor2";


import BLDG1 from "./components/BLDG1";
// import BLDG2 from "./components/BLDG2";

import './assets/App.css'



function App() {
  return (
    <div className="App">
      <Monitor1 />
      <br />
      <Monitor2 />

      <div className="container"><BLDG1 /></div>
     

    </div>
  );
}

export default App;
