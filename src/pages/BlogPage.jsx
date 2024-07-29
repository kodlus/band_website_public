/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, {useEffect, useState} from "react";
//import { getBlogPosts } from "../backend/api.js";
import BlogPostPreview from "../components/BlogPostPreview.jsx";
import { useOutletContext } from "react-router-dom";
import { getAllBlogPosts } from "../API/api.js";

/*==================================
Node backend
todo: create api for blog data
==================================*/

/*=====================================================
BlogPage 
=====================================================*/
const BlogPage = () => {
  /*================================
  States
  ================================*/
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(false);
  const [setIsLoading] = useOutletContext();

  /*================================
  Load blog posts
  ================================*/
  // Load blogPosts from the MirageServer
  useEffect(() => {
   loadBlogPosts();
  }, []);

  async function loadBlogPosts () {
    setIsLoading(true);
    try {
      const data = await getAllBlogPosts();
      setBlogPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  /*================================
  Blog elements
  ================================*/
  const blogElements = blogPosts.map((blogPost, index) => {
    return(
      <BlogPostPreview
        key={index}
        id = {blogPost.id}
        title={blogPost.title}
        date={blogPost.date}
        preview={blogPost.preview}
        img = {blogPost.img}
        alt = {blogPost.alt}
      />
    );
  });

  
  /*================================
  JSX
  ================================*/
  return (
    <>
      <main className={`blog-page site__content page-padding`}>
          <h1 className="title">Blog</h1>
          <div className="blog-page__content">
            {blogElements}
          </div>
      </main>
    </>
  );
};

export default BlogPage;