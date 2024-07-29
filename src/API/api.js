/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/*=====================================================
Blog posts
=====================================================*/
/*==================================
Get all blog posts
==================================*/
export async function getAllBlogPosts() {
  try {
    const res = await fetch("/api/blog-posts");
    const data = await res.json();
    return data.blogPosts;

  } catch (error) {
    console.log(error)
  }
}

/*==================================
Get specific blog post
==================================*/
export async function getOneBlogPost(id) {
  try {
    const res = await fetch(`/api/blog-posts/${id}`);
    const data = await res.json();

    return {data: data.blogPosts, status: res.status};

  } catch (error) {
    console.log(error)
  }
}

/*==================================
Create a new blog post
==================================*/
// This function takes in an object with inputs data,
// which is created with the blog editor.
export async function createNewBlogPost(inputs) {
  try {
    const res = await fetch("/api/blog-posts", {
      method: "POST",
      body: JSON.stringify({
        title: inputs.title,
        date: inputs.date,
        body: inputs.body
      })
    })
    
    const data = await res.json();
  
    return { body: data, status: res.status };
  } catch (error) {
    console.log(error)
  }
}

/*==================================
Update a new blog post
==================================*/
export async function updateBlogPost(id, inputs) {
  try {
    const res = await fetch(`/api/blog-posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: inputs.title,
        date: inputs.date,
        body: inputs.body
      })
    });
      
    return { status: res.status };
  } catch (error) {
    console.log(error)
  }
}

/*==================================
Delete a blog post
==================================*/
export async function deleteBlogPost(id) {
  try {
    const res = await fetch(`/api/blog-posts/${id}`, {
      method: "DELETE"
    });

    return { status: res.status };
  } catch (error) {
    console.log(error);
  }
}

/*=====================================================
Carousel
=====================================================*/
/*==================================
Get all carousel cards data
==================================*/
export async function getAllCarouselCards(id) {
  try {
    const res = await fetch(`/api/carousel-cards`);
    const data = await res.json();

    return { data: data.carouselCards, status: res.status }
  } catch (error) {
    console.log(error);
  }
}

/*=====================================================
Copywrite texts
=====================================================*/
/*==================================
Get all copywrite texts
==================================*/
export async function getCopyTexts(id) {
  try {
    const res = await fetch(`/api/copy-texts/${id}`);
    const data = await res.json();

    return {data: data.copyTexts, status: res.status}
  } catch (error) {
    console.log(error)
  }
}

/*=====================================================
Dashboard
=====================================================*/
/*==================================
Get all dashboard metrics
==================================*/
export async function getAllDashboardMetrics() {
  try {
    const res = await fetch(`/api/dashboard-metrics`);
    const data = await res.json();

    return { data: data.dashboardMetrics, status: res.status}
  } catch (error) {
    console.log(error)
  }
}

/*=====================================================
Events (like tour dates)
=====================================================*/
/*==================================
Get all events
==================================*/
export async function getAllEvents() {
  try {
    const res = await fetch("/api/events");
    const data = await res.json();

    return {data: data.events, status: res.status};
  } catch (error) {
    console.log(error);
  }
}

export async function getOneEvent(id) {
  try {
    const res = await fetch(`/api/events/${id}`);
    const data = await res.json();

    return {data: data.events, status: res.status};
  } catch (error) {
    console.log(error);
  }
}

/*=====================================================
Products
=====================================================*/
/*==================================
Get all products
==================================*/
export async function getAllProducts() {
  try {
    const res = await fetch("/api/products");
    const data = await res.json();

    return data.products;
  } catch (error) {
    console.log(error)
  }
}

/*==================================
Get specific product
==================================*/
export async function getOneProduct(id) {
  try {
    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();
    
    return data.products;
  } catch (error) {
    console.log(error)
  } 
}

/*=====================================================
Songs
=====================================================*/
/*==================================
Get all songs
==================================*/
export async function getAllSongs() {
  try {
    const res = await fetch(`/api/songs`);
    const data = await res.json();

    return { data: data.songs, status: res.status }
  } catch (error) {
    console.log(error);
  }
}

/*=====================================================
Users
=====================================================*/
/*==================================
Get specific user
==================================*/
export async function getOneUser(id) {
  try {
    const res = await fetch(`/api/users/${id}`);
    const data = await res.json();

    return { data: data.users, status: res.status };
  } catch (error) {
    console.log(error);
  }
}

/*==================================
Create new user
==================================*/
export async function createNewUser(credentials) {
  
  if (!credentials.username || !credentials.password) {
    alert("Please fill all the required fields");
    return;
  }

  // TODO: Check if the username already exists in the database
  try {
    const res = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(credentials)
    });

    return { data: res, status: res.status };

  } catch (error) {
    console.log(error)
  }
}

/*==================================
Login user
==================================*/
export async function loginUser(credentials) {
  try {
    const res = await fetch(`/api/users/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    return { data: data.user, status: res.status }
  } catch (error) {
    console.log(error);
  }
}

/*==================================
Update user information
==================================*/
export async function updateUser(id, userInformation) {
  // Check that the username and password is there
  if (!userInformation.username || !userInformation.password) {
    alert("Username and password is required");
    return;
  }

  try {
    const res = await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userInformation)
    });

    const data = await res.json();
    return { data: data.users, status: res.status };
  } catch (error) {
    console.log(error);
  }
}
