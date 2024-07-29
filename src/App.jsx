/* eslint-disable no-unused-vars */
/*=====================================================
Import
=====================================================*/
import React from 'react';
import { Routes, Route } from "react-router-dom";
import { adminPages, pages, userPages } from './allPages.jsx';
import GlobalLayout from './layouts/GlobalLayout.jsx';
import AuthRequired from './components/AuthRequired.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import UserLayout from './layouts/UserLayout.jsx';

/*=====================================================
App
=====================================================*/
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<GlobalLayout />}>
          <Route index element={pages.home}/>
          <Route path='about' element={pages.about}/>
          <Route path='contact' element={pages.contact}/>
          <Route path='tour-dates' element={pages.event}/>

          {/* Blog */}
          <Route path='blog'>
            <Route index element={pages.blog}/>
            <Route path=':id' element={pages.viewBlogPost}/> 
          </Route>

          {/* Shop */}
          <Route path='shop'> 
            <Route index element={pages.shop}/>
            <Route path='product/:id' element={pages.product}/>
            <Route path='checkout' element={<h1 className='title'>Checkout</h1>}/>
          </Route>

          {/* Login / Register */}
          <Route path='login' element={pages.loginRegister} />
          <Route path='register' element={pages.loginRegister} />

          {/* User - protected route*/}
          <Route element={<AuthRequired />}>
            <Route path='users/:id' element={<UserLayout />}>
              <Route index element={userPages.information} />
              <Route path='orders' element={userPages.orders} />
            </Route>
          </Route>

          {/* Admin - protected route */}
          <Route element={<AuthRequired />} >
            <Route path='admin' element={<AdminLayout />}>
              <Route index element={adminPages.dashboard}/>

              <Route path='blog-posts'> 
              <Route index element={adminPages.blogPosts}/>
                <Route path='create-new' element={adminPages.createBlogPost}/>
                <Route path=':id/edit' element={adminPages.editBlogPost} />
              </Route>

              <Route path="merchandise" element={adminPages.merchandise}/>
            </Route>
          </Route>

          {/* Catch-all/splat route */}
          <Route path='*' element={pages.splash}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;