/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, {useEffect, useState} from "react";
import AdminBlogPost from "../../components/AdminBlogPost.jsx";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../../components/Sidebar.jsx";
import { getAllBlogPosts } from "../../API/api.js";

/*=====================================================
AdminBlogPostsPage
=====================================================*/
export default function AdminBlogPostsPage() {
  /*=============================
  States
  ==============================*/
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(false);
  
  // This state is used for detecting if the admin has clicked a blog post's
  // delete button, in order to trigger notifications made with toastify.
  // Every blog post gets the setDeleteClicked as a prop.
  const [deleteClicked, setDeleteClicked] = useState(false);

  const [setIsLoading] = useOutletContext();
  
  /*=============================
  Navigation
  ==============================*/
  const navigate = useNavigate();
  const location = useLocation();

  /*=============================
  Loading blog posts
  ==============================*/
  // Load blogPosts from the MirageServer on mount
  useEffect(() => {
    loadBlogPosts();
  }, []);

  // Load remaining blog posts if a post is deleted
  useEffect(() => {
    if (deleteClicked === true) {
      loadBlogPosts();
      setDeleteClicked(false);
    }
  }, [deleteClicked]);

  // Loads blog posts via api.js
  async function loadBlogPosts() {
    setIsLoading(true);

    try {
      const data = await getAllBlogPosts();
      console.log(data)
      setBlogPosts(data);
    } catch (error) {
      console.log(error);
    } finally { 
      setIsLoading(false);
    }
  }

  /*=============================
  Functions
  ==============================*/
  // Navigate to the create-new-blog-page
  function toCreateNewBlog() {
    let path = `create-new`;
    navigate(path);
  }

  /*=============================
  Blog elements
  ==============================*/
  const blogElements = blogPosts.map((blog, index) => {
    // Fallback in case the post does not  have a preview
    const blogPostWords = blog.body.split(" ");
    const fallbackPreview = blogPostWords.slice(0, 20);

    return (
      <AdminBlogPost
        location = {location}
        key={index}
        title = {blog.title}
        date= {blog.date}
        preview = {blog.preview ? blog.preview : fallbackPreview}
        id = {blog.id}
        setDeleteClicked = {setDeleteClicked}
      />
    );
  });

  /*=============================
  JSX
  ==============================*/
  return (
    <section className="admin-blog-posts-page">
      <Sidebar 
        btnAction={toCreateNewBlog}
        btnText={"Create new blog post"}
        additionalClassNames = {"sidebar--small"}
      />

      <div className="blog-posts">
        {blogElements}
      </div>
    </section>
  );
}