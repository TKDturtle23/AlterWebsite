import "./App.css"
import { Routes, Route, Link } from "react-router-dom";


import Information from "./pages/Information";
import Alters from "./pages/Alters";


function App() {

  return (
      <div className="App">
        <div className={'TopBar'}>
            <Link to="/information">
                <button className="topButtons">Information</button>
            </Link>

            <Link to="/alters">
                <button className="topButtons">Alters</button>
            </Link>
        </div>
          <div className={"content"}>
              <div className={"Inner"}>
                  <Routes>
                      <Route path="/" element={<Information />} />
                      <Route path="/information" element={<Information />} />
                      <Route path="/alters" element={<Alters />} />
                  </Routes>
              </div>

          </div>
      </div>
  )
}

export default App