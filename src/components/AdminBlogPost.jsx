/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { deleteBlogPost } from "../API/api.js";
import { toast } from "react-toastify";

/*======================================================
AdminBlogPost
(Gets its props from AdminBlogPostsPage.jsx)
======================================================*/
const AdminBlogPost = ({ title, date, preview, id, setDeleteClicked }) => {
  /*==================================
  Variables
  ==================================*/
  let navigate = useNavigate();

  /*==================================
  Functions
  ==================================*/
  function toEditBlog(id) {
    let path = `${id}/edit`;
    navigate(path);
  }

  async function handleDelete() {
    try {
      let res = await deleteBlogPost(id);

      // Check if the response is valid
      if (res.status === 204) {
        toast.success('Note deleted successfully');
        setTimeout(() => {
          setDeleteClicked(true);
        }, 1000);
      } else {
        toast.error(`Something went wrong! Status code: ${res.status}`);
      }

    } catch (error) {
      console.log(error);
      toast.error('Error deleting note.');
    } 
  }




  /*==================================
  JSX
  ==================================*/
  return (
    <div className="admin-blog-post" >
      <h2>
        <NavLink to={`${id}/edit`}>{title}</NavLink> 
      </h2>
      <span>{date}</span>
      <p>{preview}</p>

      <div className="admin-blog-post__toolbox">
        <button 
          className="btn btn--toolbox" 
          onClick={() => toEditBlog(id)}
        >
          <FaRegEdit /* color="#e8eaed" */ size={24} />
        </button>
        
        <button 
          className="btn btn--toolbox" 
          onClick={() => handleDelete()}
        >
          <FaRegTrashAlt /* color="#e8eaed" */ size={24} />
        </button>
      </div>
    </div>
  );
};

export default AdminBlogPost;