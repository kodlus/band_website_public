/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getOneUser, updateUser  } from "../API/api.js";
import { toast } from "react-toastify";

/*=====================================================
UserInformation
=====================================================*/
const UserInformation = ({ setIsLoading }) => {
    /*=============================
    States
    ==============================*/
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    
    const params = useParams();
    const id = params.id;
    
    /*=============================
    Load user data
    ==============================*/
    useEffect(() => {
      loadUser();
    }, []);

    async function loadUser() {
      setIsLoading(true);
      try {
        const user = await getOneUser(id);
        console.log(user.data)
        setUser(user.data);
      } catch (error){
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    /*=============================
    Functions
    ==============================*/
    function handleChange(event) {
      setUser(prev => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    }

    function toggleUpdateAccount(event) {
      event.preventDefault()

      setIsUpdating(prev => !prev);
      setReadOnly(prev => !prev);
    }
  
    function handleDiscardChanges(event) {
      event.preventDefault();
      setIsUpdating(false);
      setReadOnly(true)
      loadUser();
    }
  
    async function handleUpdateAccount(event) {
      event.preventDefault();
      try {
        await updateUser(id, user);
    
        setIsUpdating(false);
        setReadOnly(true);
        toast.success('Successfully updated the account');
        loadUser(id);
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong when updating your account')
      }
    }
  
    function handleDeleteAccount(event) {
      event.preventDefault();
      alert("Feature not implemented")
    }
  
  /*=============================
  JSX
  ==============================*/
  return (
    <form action="" className='user-information'>
      <div className="user-information__login">
        <h3>Login information</h3>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id='email'
          name="email" 
          value={user.email ?? ""} // [16, 17]
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />

        <label htmlFor="username">Username</label>
        <input 
          type="text" 
          id='username' 
          name="username"
          value={user.username ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />
        
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password"
          value={user.password ?? ""}
          onChange={handleChange}
          id="password" 
          readOnly={readOnly ? true : false}
          required
        />
      </div>

      <div className="user-information__shipping">
        <h3>Shipping information</h3>

        <label htmlFor="first-name">First name</label>
        <input 
          type="text" 
          id='first-name' 
          name="first_name"
          value={user.first_name ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />

        <label htmlFor="last-name">Last name</label>
        <input 
          type="text" 
          id='last-name' 
          name="last_name"
          value={user.last_name ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />

        <label htmlFor="address">Address</label>
        <input 
          type="text" 
          id='address' 
          name="address"
          value={user.address ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />

        <label htmlFor="city">City</label>
        <input 
          type="text" 
          id='city' 
          name="city"
          value={user.city ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required />

        <label htmlFor="county">County</label>
        <input 
          type="text" 
          id='county' 
          name="county"
          value={user.county ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />

        <label htmlFor="zip">Zip code</label>
        <input 
          type="number"
          name='zip_code'
          id='zip' 
          value={user.zip_code ?? ""}
          onChange={handleChange}
          readOnly={readOnly ? true : false}
          required 
        />
      </div>

      <div className='user-information__footer'>
          {!isUpdating && 
            <button 
              className="btn btn--rounded"
              onClick={toggleUpdateAccount}
            >
              Update Account
            </button> }
          
          {isUpdating && 
            <>
              <button 
                onClick={handleUpdateAccount} 
                className="btn btn--rounded green"
                type="submit"
              >
                  Confirm Changes
              </button>

              <button 
                onClick={handleDiscardChanges}
                className="btn btn--rounded yellow"
              >
                Discard Changes
              </button>
            </>
          }

        <button 
          className="btn btn--rounded red" 
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </form>
  );
};

export default UserInformation;