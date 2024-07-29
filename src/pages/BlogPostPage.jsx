/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom"
//import { getBlogPosts } from "../backend/api.js";
import BlogPost from "../components/BlogPost.jsx";
import Breadcrumb from "../components/navigation/Breadcrumb.jsx";
import { getOneBlogPost } from "../API/api.js";
import { toast } from "react-toastify";

/*=====================================================
BlogPagePage
=====================================================*/
const BlogPostPage = () => {
  /*================================
  States & variables
  ================================*/
  const [blogPost, setBlogPost] = useState();
  const [error, setError] = useState();
  const [setIsLoading] = useOutletContext();

  const id = useParams().id;
  console.log(useParams())
  
  /*================================
  Load blog post
  ================================*/
  useEffect(() => {
    loadBlogPost(id);
  }, []);

  async function loadBlogPost(id) {
    setIsLoading(true);
    try {
      const res = await getOneBlogPost(id);
      setBlogPost(res.data);

    } catch (error) {
      console.log(error);
      toast.error('Error loading the blog post');
    } finally {
      setIsLoading(false);
    }
  }

  /*================================
  JSX
  ================================*/
  return (
    <>
      <Breadcrumb origin={"../"} linkText={"Back to the Blog page"}/>
      <main className="blog-post-page site__content page-padding">
        {blogPost && 
          <>
            <BlogPost
              id = {blogPost.id}
              title={blogPost.title}
              date={blogPost.date}
              body={blogPost.body}
              img = {blogPost.img}
              alt = {blogPost.alt}        
            />
          </>
        }
      </main>
    </>
  );
};

export default BlogPostPage;