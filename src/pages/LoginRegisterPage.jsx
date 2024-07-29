/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { createNewUser, getOneUser, loginUser } from '../API/api.js';
import InfoBtn from "../components/InfoBtn.jsx"
import { toast } from 'react-toastify';

/*=====================================================
LoginRegisterPage
=====================================================*/
const LoginRegisterPage = () => {
  /*================================
  States
  ================================*/
  const [formData, setFormData] = useState({
    username: "", 
    password: "", 
    role:"user"});

  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  
  /*================================
  Navigation
  ================================*/
  const navigate = useNavigate();
  const location = useLocation();

  function loginNavigation(id) {
    if(formData.username === "admin") {
     navigate("/admin", { replace: true });
   } else {
     navigate(`/users/${id}`, { replace: true });
   }
  }
  
  /*================================
  Check pathname
  ================================*/
  // For redirecting the user to 
  // /login or /register
  let toPath = "";
  if(location.pathname === "/login") {
    toPath = "/register"
  } else {
    toPath = "/login"
  }

  useEffect(() =>{
    if(location.state) {
      setMessage(location.state.message);
    }
  }, []);

  /*================================
  Warning message
  ================================*/
  useEffect(() => {
    if(message) {
      toast.warn(message);
    }
  }, [message]);

  /*================================
  Functions
  ================================*/
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev, 
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Check URL
    if (location.pathname ==="/login") {
      try {
        const login = await loginUser(formData);
        console.log(login.data)

        if (login.status === 201) {
          localStorage.setItem("loggedin", true);
          localStorage.setItem("username", login.data.username);
          localStorage.setItem("role", login.data.role);
          localStorage.setItem("id", login.data.id);
          toast.success("Successfully logged in");

          setTimeout(() => {
            loginNavigation(login.data.id);
          }, 1500);
        } else {
          toast.error(`Wrong credentials. Status: ${login.status}`);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong when logging in");
      }

    } else  {
    try {
      await createNewUser(formData);
      toast.success("New user created");
      setFormData({username: "", password: "", role:"user"});
      navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong when registering the account");
    }
      
/*       createNewUser(formData)
      .then(data => {
        setError(null);
        toast.success("New user created");
        setMessage("");
        setFormData({username: "", password: "", role:"user"});
        navigate("/login");
      })
      .catch(err => {
        toast.error("Something went wrong when registering the account");
        setError(err);
        console.log(err);
      }); */
    }
  }

  /*================================
  JSX
  ================================*/
  return (
    <main className='login-register-page site__content page-padding'>
      <form className='login-register-form' onSubmit={handleSubmit}>
        <h1 className='title title--no-margin title--dark center'>
          {location.pathname ==="/login" && "Login page"}
          {location.pathname ==="/register" && "Register page"} 
        </h1>
      
        { error?.message &&
          <h3 className="login-first">{error.message}</h3> }

        <input 
          type="text" 
          name="username" 
          id="login-form__username" 
          placeholder='Username'
          onChange={handleChange}
          value={formData.username}
        />
        
        <input 
          type="password" 
          name="password" 
          id="login-form__password" 
          placeholder='Password...'  
          onChange={handleChange}
          value={formData.password}
        />


        <button className='btn'>
          {location.pathname === "/login" ? "Log in" : "Register"}
        </button>
      
        <Link to={toPath}>
          {location.pathname ==="/login" && "Don't have an account? Register here"}
          {location.pathname ==="/register" && "Already have an account? Log in here"}   
        </Link>
      </form>
      <InfoBtn />
    </main>
  );
}

export default LoginRegisterPage;