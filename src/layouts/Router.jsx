import {
    createBrowserRouter,
    createRoutesFromElements,
    Route, 
  } from "react-router-dom";

import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
import TaskDetails from "../components/TaskDetails";
import Protected from "../components/Protected";


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Protected Component={Profile}/>}/>   
        <Route path="/task/:id" element={<Protected Component={TaskDetails}/>}/>
      </Route>
    )
  );
  
  export default router;