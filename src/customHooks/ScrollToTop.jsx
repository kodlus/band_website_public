/* eslint-disable no-unused-vars */
/*==============================================================================
Import
==============================================================================*/
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/*==============================================================================
ScrollToTop [13]
==============================================================================*/
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // Scroll to top when the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}