/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*=====================================================
Imports
=====================================================*/
import { toast } from 'react-toastify';

/*=====================================================
Events (like tour dates)
=====================================================*/
/*==================================
Get all events
==================================*/
/* export async function getEvents(id) {
  const url = id ? `/api/events/${id}` : "/api/events";
  const res = await fetch(url);
  if(!res.ok) {
    throw {
      message: "Failed to fetch events",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  return data.events;
} */

/*=====================================================
Products
=====================================================*/
/*==================================
Get all products
==================================*/
/* export async function getProducts(id) {
  const url = id ? `/api/products/${id}` : "/api/products";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch products",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  return data.products;
} */

/*=====================================================
Songs
=====================================================*/
/*==================================
Get all songs
==================================*/
/* export async function getSongs(id) {
  const url = id ? `/api/songs/${id}` : "/api/songs";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch songs",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  return data.songs;
} */

/*=====================================================
Dashboard
=====================================================*/
/*==================================
Get all dashboard metrics
==================================*/
/* export async function getDashboardMetrics(id) {
  const url = id ? `/api/dashboard-metrics/${id}` : "/api/dashboard-metrics";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch dashboard metrics",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  return data.dashboardMetrics;
} */

/*=====================================================
Carousel
=====================================================*/
/*==================================
Get all carousel cards data
==================================*/
/* export async function getCarouselCards(id) {
  const url = id ? `/api/carousel-cards/${id}` : "/api/carousel-cards";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch carousel data",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  //console.log(data)
  return data.carouselCards;
} */

/*=====================================================
Copywrite texts
=====================================================*/
/*==================================
Get all copywrite texts
==================================*/
/* export async function getCopyTexts(id) {
  const url = id ? `/api/copy-texts/${id}` : "/api/copy-texts";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch copy texts",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  return data.copyTexts;
} */

/*=====================================================
Blog Posts
=====================================================*/
/*==================================
Get all blog posts
==================================*/
/* export async function getBlogPosts(id) {
  const url = id ? `/api/blog-posts/${id}` : "/api/blog-posts";
  const res = await fetch(url);
  
  if(!res.ok) {
    throw {
      message: "Failed to fetch products",
      statusText: res.statusText,
      status: res.status
    }
  }

  const data = await res.json();
  return data.blogPosts;
} */

/*==================================
Create a new blog post
==================================*/
// This function takes in an object with inputs data,
// which is created with the blog editor.
/* export function createNewBlogPost(inputs) {
  fetch("/api/blog-posts", {
    method: "POST",
    body: JSON.stringify({
      title: inputs.title,
      date: inputs.date,
      body: inputs.body
    })
  })
  .then(res => {
    // If a blog post is created, navigate back to the list of blog posts
    if (res.status === 201) {
      console.log("Stuff created")
      toast.success('Blog post added successfully');
      setTimeout(() => {
        navigate("/admin/blog-posts");
      }, 2000); 
    } else {
      console.log("Stuff is missing")
      toast.error('Title and text body needs to be filled');
    }
  })
  .catch(err => {
    console.log(err);
  });
} */

/*==================================
Update a specific blog post
==================================*/
// This function takes in an id and inputs data, the latter
// is provided by/created with the blog editor.
/* export function updateBlogPost(id, inputsObj) {
  const {title, date, img, body} = inputsObj;
  
  // Error message if one or more fields are left empty:
  const checkValues = {title: title, date: date, body: body}
  // Iterate over inputs' values:
  for(let values of Object.values(checkValues) ) {
    // Look for empty strings
    if(values === "") {
      console.log("Empty string");
      toast.error('Please fill all the required input fields');
      return;
    }
  }

  // Update the blog post
  fetch(`/api/blog-posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      title: title,
      date: date,
      img: img,
      body: body,
    }),
  })
  .then((res) => {
    // The notification's (toast) parent element is in BlogEditor.jsx
    toast.success('Blog post updated successfully.');
  })
  .catch((error) => {
    console.log('Blog post not found', error);
    toast.error('Error updating blog post.');
  });
} */

// This function uses a callback function to trigger
// a state change in the BlogPostPage.jsx
// The function itself is used in AdminBlogPost.jsx
/* export function deleteBlogPost(id, callBack) {
  fetch(`/api/blog-posts/${id}`, {
    method: "DELETE",
  })
  .then((res) => {
    callBack(true);
    // Notification are displayed in AdminBlogPostPage.jsx
    
  })
  .catch((error) => {
    console.log('Note not found', error);
    
  });
} */

/*=====================================================
Users
=====================================================*/
/* // Get users
export async function getUser(id) {
  const url = `/api/users/${id}`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw {
      message: "Failed to fetch products",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json();
  return data.users;
}


// Get user and login
export async function loginUser(creds) {
  const res = await fetch("/api/users/login",
      { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
      throw {
          message: data.message,
          statusText: res.statusText,
          status: res.status
      }
  }
  return data;
}

// Create new user
export async function createNewUser(creds) {
  // Send error message one or more fields are empty
  if(!creds.username || !creds.password) {
    alert("Please fill all the required fields")
    return
  }

  const res = await fetch("/api/users/register",
  { method: "post", body: JSON.stringify(creds) }
  )
  const data = await res.json()

  if (!res.ok) {
    throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status
    }
  }
  return data
} */

// Takes two optional callbacks. See UserInformation.jsx for more details
/* export function updateUser(
  id, 
  data, 
  isUpdating = () => console.log("optional callback"),
  readOnly = () => console.log("another optional callback")
  ) {
 
  // Error message if one or more fields are left empty:
   // Iterate over inputs' values:
  for(let values of Object.values(data) ) {
    // Look for empty strings
    if(values === "") {
      console.log("Empty input field detected");
      toast.error('Please fill all the required input fields');
      isUpdating(true);
      return;
    }
  }
  
  // Update the user
  fetch(`/api/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  },
  
  // Turns off the form's "updating mode", affecting which buttons
  // that are displayed
  isUpdating(false),
  // Makes the form read-only
  readOnly(true),
  // Toasts are displayed in UserInformationPage.jsx
  toast.success('Successfully updated the account')
  )
  .catch((error) => {
    console.log('Error updating the user information', error);
    toast.error('Error updating user information.');
  });
} */
