/*=====================================================
Imported pages
=====================================================*/
import AboutPage from "./pages/AboutPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import EventPage from "./pages/EventPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import AdminCreateNewBlogPostPage from "./pages/admin/AdminCreateNewBlogPostPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import AdminEditBlogPostPage from "./pages/admin/AdminEditBlogPostPage.jsx";
import AdminBlogPostsPage from "./pages/admin/AdminBlogPostsPage.jsx";
import BlogPostPage from "./pages/BlogPostPage.jsx";
import AdminMerchandisePage from "./pages/admin/AdminMerchandisePage.jsx";
import UserInformationPage from "./pages/user/UserInformationPage.jsx";
import UserOrderHistoryPage from "./pages/user/UserOrderHistoryPage.jsx";
import LoginRegisterPage from "./pages/LoginRegisterPage.jsx";

/*=====================================================
allPages.jsx
=====================================================*/
export const pages = {
  about: <AboutPage />,
  blog: <BlogPage />,
  viewBlogPost: <BlogPostPage />,
  contact: <ContactPage />,
  event: <EventPage />,
  home: <HomePage />,
  loginRegister: <LoginRegisterPage />,
  splash: <NotFoundPage />,
  product: <ProductPage />,
  shop: <ShopPage />,
}

export const adminPages = {
  dashboard: <AdminDashboardPage />,
  blogPosts: <AdminBlogPostsPage />,
  createBlogPost: <AdminCreateNewBlogPostPage />,
  editBlogPost: <AdminEditBlogPostPage />,
  merchandise: <AdminMerchandisePage />,
}

export const userPages = {
  information: <UserInformationPage />,
  orders: <UserOrderHistoryPage />
}