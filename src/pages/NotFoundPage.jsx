/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from "react";
import { Link } from "react-router-dom"

/*=====================================================
NotFoundPage
=====================================================*/
export default function NotFoundPage() {
  return(
    <main className="not-found-page site__content page-padding">
      <h1 className="not-found-page__text">Sorry, the page you were looking for was not found.</h1>

      <Link className="link" to="/">Return to the home page</Link>
    </main>
  )
}