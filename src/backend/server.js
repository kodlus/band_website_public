/* eslint-disable no-unused-vars */
/*========================================================
Import 
=========================================================*/
import { createServer, Model, Response } from "miragejs";
import { tourData } from "./serverData/tourData.js";
import { blogData } from "./serverData/blogData.js";
import { productsData } from "./serverData/productsData.js";
import { users } from "./serverData/users.js";
import { songData } from "./serverData/songData.js";
import { carouselData } from "./serverData/carouselData.js";
import { copyTexts } from "./serverData/copyTexts.js";
import { dashboardData } from "./serverData/dashboardData.js";

/*========================================================
Server [12]
=========================================================*/
export function makeServer({environment = "test"} = {}) {
  /*==================================
  Models
  ==================================*/
  let server = createServer({
    models: {
      blogPosts: Model,
      products: Model,
      users: Model,
      events: Model,
      songs: Model,
      carouselCards: Model,
      copyTexts: Model,
      dashboardMetrics: Model,
    },
    
  /*==================================
  Seeds (premade data)
  ==================================*/
    seeds(server) {
      /*=====================
      Events / Tour dates
      =====================*/
      tourData.forEach(tourDate => {
        server.create("event", tourDate);
      });

      /*=====================
      Blog posts
      =====================*/
      blogData.forEach(blogEntry => {
        server.create("blog-post", blogEntry);
      });

      /*=====================
      Products
      =====================*/
      productsData.forEach(product => {
        server.create("product", product);
      });
      
      /*=====================
      Users
      =====================*/
      users.forEach(user => {
        server.create("user", user);
      });
      
      /*=====================
      Songs
      =====================*/
      songData.forEach(song => {
        server.create("song", song);
      });    
    
    
      /*=====================
      Carousel
      =====================*/
      carouselData.forEach(carouselCard => {
        server.create("carousel-card", carouselCard);
      });

      /*=====================
      Copy texts
      =====================*/
      copyTexts.forEach(text => {
        server.create("copy-text", text);
      });

      /*=====================
      Dashboard metrics
      =====================*/
      dashboardData.forEach(dashboardMetric => {
        server.create("dashboard-metric", dashboardMetric)
      });
    },

    /*==================================
    API Routes
    ==================================*/
    routes() {
      this.namespace = "api";

      /*=====================
      Tour events
      =====================*/
      this.get("dashboard-metrics", (schema, request) => {
        return schema.dashboardMetrics.all();
      })

      /*=====================
      Tour events
      =====================*/
      // Read all tour events
      this.get("/events", (schema, request) => {
        return schema.events.all();
      });

      // Read all tour events
      this.get("/events/:id", (schema, request) => {
        const id = request.params.id;
        return schema.events.find(id);
      });

      /*=====================
      Carousel
      =====================*/
      // Read carousel objects
      this.get("/carousel-cards", (schema, request) => {
        return schema.carouselCards.all();
      });

      /*=====================
      Blog posts
      =====================*/
      // Read all blog posts
      this.get("/blog-posts", (schema, request) => {
        return schema.blogPosts.all();
      });

      // Read a specific blog post
      this.get("/blog-posts/:id", (schema, request) => {
        const id = request.params.id;
        return schema.blogPosts.find(id);
      });

      // Create a new blog post
      this.post("/blog-posts", (schema, request) => {
        // Get the data from the request
        const { title, date, body } = JSON.parse(request.requestBody);

        // Message if there is missing values
        if (!title || !body) {
          return new Response(400, { some: 'header' }, { errors: [ 'Fields cannot be blank'] })
        }

        let attributes = JSON.parse(request.requestBody);
        return schema.blogPosts.create(attributes);
      });

      // Update blog post
      this.patch("/blog-posts/:id", (schema, request) => {
        let newAttributes = JSON.parse(request.requestBody);
        let id = request.params.id;
        let blogPost = schema.blogPosts.find(id);
        return blogPost.update(newAttributes);
      });

      // Delete blog post
      this.delete("/blog-posts/:id", (schema, request) => {
        let id = request.params.id;
        return schema.blogPosts.find(id).destroy();
      });

      /*=====================
      Products
      =====================*/
      // Read all products
      this.get("/products", (schema, request) => {
        return schema.products.all();
      });
  
      // Read a specific product
      this.get("/products/:id", (schema, request) => {
        const id = request.params.id;
        return schema.products.find(id);
      });

      /*=====================
      Copy texts
      =====================*/
      // Read all products
      this.get("/copy-texts", (schema, request) => {
        return schema.copyTexts.all();
      });
  
      // Read a specific product
      this.get("/copy-texts/:id", (schema, request) => {
        const id = request.params.id;
        return schema.copyTexts.find(id);
      });

      /*=====================
      Songs
      =====================*/
      // Read all songs
      this.get("/songs", (schema, request) => {
        return schema.songs.all();
      });

      // Read a specific song
      this.get("/songs/:id", (schema, request) => {
        const id = request.params.id;
        return schema.songs.find(id);
      });

      /*=====================
      Users
      =====================*/
      // Login user
      this.post("/users/login", (schema, request) => {
        const {username, password, role} = JSON.parse(request.requestBody);
        const foundUser = schema.users.findBy({ username, password });

        if (!foundUser) {
          return new Response(401, {}, { message: "No user with those credentials found!" });
        }

        foundUser.password = undefined;
        return {
            user: foundUser,
            token: "Enjoy your pizza, here's your tokens."
          }
      });
    
      // Create user
      this.post("/users/register", (schema, request) => {
        let attributes = JSON.parse(request.requestBody);
        
        return schema.users.create(attributes);
      });

      // Read a specific user
      this.get("/users/:id", (schema, request) => {
        const id = request.params.id;
        return schema.users.find(id);
      });

      // Update user
      this.patch("/users/:id", (schema, request) => {
        let newAttributes = JSON.parse(request.requestBody);
        let id = request.params.id;
        let user = schema.users.find(id);
        return user.update(newAttributes);
      });
    }
  });
  return server;
}
