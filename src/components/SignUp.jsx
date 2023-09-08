import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [username,setUsername]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');

    const navigate=useNavigate();
    


  const handleSignUp=async(e)=>{
    e.preventDefault();

    if(username&&email&&password)
    {let isLoggedIn=true;
    let bio='';
    let picture='';
    let id=Date.now();
    let data={username,email,password,isLoggedIn,bio,picture,id};
    

    localStorage.setItem('user-'+id,JSON.stringify(data));
    localStorage.setItem('loggedInUser',JSON.stringify(data));

     setEmail('');
     setPassword('');
     setUsername('');
     navigate('/profile');

    }
    else
    {
      alert('Invalid Data');
    }
  }
  
  return (
  <div>
  <div className="signup-container">
      <h2>Create an Account</h2>
      <form className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          
        />
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
     
        <button type="submit" onClick={handleSignUp}>Sign Up</button>

        <div >
            <p>If you already have Signup</p>
            <a href="/login">Login</a>
        </div>
      </form>
    </div>

  </div>
  )
}
export default SignUp