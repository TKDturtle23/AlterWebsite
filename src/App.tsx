import "./App.css"
import { Routes, Route, Link } from "react-router-dom";


import Information from "./pages/Information";
import Alters from "./pages/Alters";


function App() {

  return (
      <div className="App">
        <div className={'TopBar'}>
            <Link to="/information" className="topButton">Information</Link>
            <Link to="/alters" className="topButton">Alters</Link>
            <Routes>
                <Route path="/alters" element={<h1>Alters</h1>} />
            </Routes>

        </div>
          <div className={"content"}>

                  <Routes>
                      <Route path="/" element={<Information />} />
                      <Route path="/information" element={<Information />} />
                      <Route path="/alters" element={<Alters />} />
                  </Routes>


          </div>
      </div>
  )
}

export default App