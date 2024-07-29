/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React, {useEffect, useState} from "react";
//import { getBlogPosts } from "../../backend/api.js";
import { useOutletContext, useParams } from "react-router-dom";
import BlogEditor from "../../components/BlogEditor.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "../../components/navigation/Breadcrumb.jsx";
import { getOneBlogPost } from "../../API/api.js";

/*=====================================================
AdminEditBlogPostPage
=====================================================*/
const AdminEditBlogPostPage = () => {
  /*==================================
  States 
  ==================================*/
  const [blogPost, setBlogPost] = useState();
  const [error, setError] = useState();
  const [setIsLoading] = useOutletContext();

  /*==================================
  Getting blog post id
  https://reactrouter.com/en/main/hooks/use-params
  ==================================*/
  const params = useParams();
  const id = params.id;

  /*==================================
  Loading specific blog post
  ==================================*/
  useEffect(() => {
   loadBlogPost(id);
  }, []);

  async function loadBlogPost(id) {
    setIsLoading(true)
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

  /*==================================
  JSX
  ==================================*/
  return (
    <>
      <Breadcrumb linkText={"Back to Blog posts"} origin={"../.."} additionalClass="breadcrumb--edit"/>

      <section className="admin-edit-blog-post-page">
        
        <h1>Edit Blog Post</h1>
        {/* Renders when the fetch request to complete. This is to prevent an error from occurring ("post is not defined") */}
        {blogPost && <BlogEditor post={blogPost}/>}
      </section>
    </>
  );
};

export default AdminEditBlogPostPage;