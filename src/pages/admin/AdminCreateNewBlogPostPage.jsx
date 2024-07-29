/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";
import BlogEditor from "../../components/BlogEditor.jsx";
import Breadcrumb from "../../components/navigation/Breadcrumb.jsx";

/*=====================================================
CreateNewBlogPostPage
=====================================================*/
const AdminCreateNewBlogPostPage = () => {
  return (
    <section className="admin-new-blog-post-page">
          <Breadcrumb linkText={"Back to Blog posts"} origin={"../"} additionalClass="breadcrumb--edit"/>
      <h1>Create Blog Post</h1>
      <BlogEditor post=""/>
    </section>
  );
};

export default AdminCreateNewBlogPostPage;