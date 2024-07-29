/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import { Link } from 'react-router-dom';

/*=====================================================
BreadCrumb
=====================================================*/
const Breadcrumb = ({ linkText, origin, additionalClass }) => {
  // Origin is the path to the location the user came from.
  // Can be adjusted with conditionals, e.g.:
  // location.state?.search && location.state? !== "?undefined" ? 
  //    `../..${location.state?}` : "../.."
  return (
    <div className={`breadcrumb ${additionalClass}`}>
      <Link 
        to={origin}
        relative='path'
        state={{}}
        className={`link`}
      >
        &larr; {linkText}
      </Link>
    </div>
  );
};

export default Breadcrumb;