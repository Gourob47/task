import logo from './logo.svg';
import './App.css';
import { Link, RouterProvider, useNavigate } from "react-router-dom";
import router from './layouts/Router';
function App() {
  return (
    <div className="App">
        <>
          <RouterProvider router={router}/>
        </>
    </div>
  );
}

export default App;
