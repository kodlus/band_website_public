/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import UserInformation from '../../components/UserInformation';
import { ToastContainer } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

/*=====================================================
UserInformationPage
=====================================================*/
const UserInformationPage = () => {
  /*=============================
  State
  ==============================*/
  const [setIsLoading] = useOutletContext();

  /*=============================
  JSX
  ==============================*/
  return (
    <section className='user-information-page'>
      <UserInformation setIsLoading={setIsLoading}/>
    </section>
  )
}

export default UserInformationPage;