/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*======================================================
Imports
======================================================*/
import React from 'react';

/*======================================================
BlogPost
======================================================*/
const BlogPost = ({title, date, body, img, alt,}) => {
  console.log(img)

  return (
    <div className='blog-post'>
      <h2 className='blog-post__title'> {title} </h2>
      <span className='blog-post__date'> {date} </span>
      
      <div className='blog-post__content'>
        <p className='blog-post__copy'>
          {body}
        </p>

        {/* Render if img is true, i.e., passed as a prop */}
        {img && <img src={img} alt={alt} className='blog-post__img'/>}
        
      </div>
    </div>
  );
};

export default BlogPost;