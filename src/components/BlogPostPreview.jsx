/* eslint-disable no-unused-vars */
/*======================================================
Imports
======================================================*/
import React from 'react';
import { NavLink } from 'react-router-dom';

/*======================================================
BlogPost
======================================================*/
// eslint-disable-next-line react/prop-types
const BlogPostPreview = ({ title, id, date, preview }) => {
  return (
    <div className='blog-post-preview'>
      <h2>
        <NavLink to={`${id}`}>{title}</NavLink>  
      </h2>
      <span>{date}</span>

      <p>
        {preview}
      </p>
    </div>
  );
};

export default BlogPostPreview;