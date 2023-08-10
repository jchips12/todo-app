import {BrowserRouter, Route, Routes} from "react-router-dom";
import Tasks from "./task/Tasks";

function App() {
  return (
      <BrowserRouter>
        <div className="h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Tasks/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
