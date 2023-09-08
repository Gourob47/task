import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
   
   const navigate=useNavigate();


    const loginUser=(e)=>{

      e.preventDefault();

      const allUser = Object.keys(localStorage)
      .filter((key) => key.startsWith('user-'))
      .map((key) => JSON.parse(localStorage.getItem(key)));
  
      let userExist=allUser.filter((item)=>item.email===email && item.password===password);



      if(userExist.length>0){
        userExist[0].isLoggedIn=true;
        localStorage.setItem(`user-${userExist[0].id}`,JSON.stringify(userExist[0]));
        localStorage.setItem('loggedInUser',JSON.stringify(userExist[0]))
        navigate('/profile');     
      }
      else
      {
        alert('User Not Found');
      }
      setPassword('');
      setEmail('');

    }

  return (
    <div>
      <div className="signup-container">
      <h2>Login As User</h2>
      <form className="signup-form">
       
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
       
        />
     
        <button type="submit" onClick={loginUser}>Login</button>

        <div >
            <p>If you Dont't have any Account</p>
            <a href="/">SignUp</a>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login