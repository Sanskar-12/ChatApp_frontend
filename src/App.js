import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Join from "./components/Join";
import Chat from "./components/Chat";
import "./App.css"
import {Toaster} from "react-hot-toast"



function App() {


  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Join/>}/>
            <Route path="/chat" element={<Chat/>}/>
          </Routes>
          <Toaster/>
        </Router>
    </div>
  );
}

export default App;
