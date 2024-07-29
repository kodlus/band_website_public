/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewBlogPost, updateBlogPost } from "../API/api.js";
import { toast } from "react-toastify";

/*=====================================================
BlogEditor
=====================================================*/
const BlogEditor = ({ post }) => {
  /*==================================
  States, navigate, and useEffect
  ==================================*/
  const [inputs, setInputs] = useState({
    title: "", 
    date: new Date().toISOString().split('T', 1)[0], 
    img: "",
    body: ""});

  // To check if the admin has pressed the submit button.
  // If true, the submit button becomes disabled
  const [posted, setPosted] = useState(false);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(()=> {
    // If a post is in edit mode, fill the input fields with the
    // post's previous data on mount
    if (post) {
      setInputs({
        title: post.title,
        date: post.date,
        img: post.img,
        body: post.body,
      });
    }
  }, []);



  /*==================================
  Handle submit
  ==================================*/
  function handleSubmit(event) {
    event.preventDefault();

    if (!post.id) {
      postNewBlog();
    } else {
      postUpdatedBlog();
    }
  }

  async function postUpdatedBlog() {
    setPosted(true);
    try {
      const res = await updateBlogPost(id, inputs);

      if (res.status === 200) {
        toast.success('Blog post updated');
        setTimeout(() => {
          navigate("/admin/blog-posts");
        }, 2000);
      } else {
        toast.error(`Something went wrong! Status: ${res.status}`);
        setPosted(false);
      }
    } catch (error) {
      console.log(error);
      setPosted(false);
    } 
  }

  async function postNewBlog() {
    try {
      // Get data
      const data = await createNewBlogPost(inputs);
      console.log(data)
      
      // Check if the status code is correct
      if (data.status === 201) {
        toast.success('Blog post created');
        setTimeout(() => {
          navigate("/admin/blog-posts");
        }, 2000);
      } else {
        console.log("Something went wrong, try again")
      }

    } catch (error) {
      console.log(error)
    }
  }

  function handleChange(event) {
    setInputs(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function message() {
    alert("This function is not implemented and does not work at this point")
  }

  /*==================================
  JSX
  ==================================*/
  return (
    <>
      <form className="blog-editor">
        <label htmlFor="title">Title</label>
        <input 
          type="text"
          className="blog-editor__input"
          value={inputs.title}
          onChange={handleChange}
          placeholder="Title"
          name="title"
          id="title"
          required
        />

        <label htmlFor="image">Image</label>
        <input 
          id="image" 
          name="img"
          type="file" 
          
          onChange={message}
          accept="image/*" 
        />

        <p>Preview:</p>  
        <img src={inputs.img} alt="" />

        <label htmlFor="body">Text Body</label>
        <textarea 
          rows="10"
          className="blog-editor__input"
          value={inputs.body}
          placeholder="What's on your mind?"
          onChange={handleChange}
          name="body"
          id="body"
          required
        />

        <button 
          type="submit" 
          className="btn btn--rounded" 
          onClick={handleSubmit}
          disabled={posted ? true : false}
          
        >
          {post.id ? "Update Blog Post" : "Create New Blog Post"}
        </button>
      </form>
    </>
  );
};

export default BlogEditor;