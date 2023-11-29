/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Admins from "layouts/admin";
import Addadmin from "layouts/admin/addadmin";
import Editadmin from "layouts/admin/data/editadmin";
import Users from "layouts/users";
import Adduser from "layouts/users/addusers";
import Edituser from "layouts/users/data/edituser";
import Category from "layouts/category";
import Banner from "layouts/banner";
import Brand from "layouts/brand";
import Tag from "layouts/tag";
import Material from "layouts/material";
import Coupon from "layouts/coupon";
import Product from "layouts/product";
import Addproduct from "layouts/product/addproduct";
import Editproduct from "layouts/product/data/editproduct";
import Order from "layouts/order";
import Cancel from "layouts/order/cancel";
// import Request from "layouts/order/request";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Userreg from "userside/userreg";
import Forgot from "userside/forgotpassword";
import Otp from "userside/userotp";
import Reset from "userside/resetpassword";
import About from "userside/about";
import Blog from "userside/blog";
import Blogdetails from "userside/blogdetails";
import Contact from "userside/contact";
import Home from "userside/home";
import Shop from "userside/shop";
import Shopdetails from "userside/shopdetails";
import Shopcart from "userside/shopcart";
import Wishlist from "userside/wishlist";
import Checkout from "userside/checkout";
import Invoice from "userside/invoice";
import Track from "userside/track";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Table",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   //collapse: <Route exact path="/dashboard" key="users" />,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  {
    type: "collapse",
    name: "Admin Management",
    key: "admins",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">shield_person</span>
      </Icon>
    ),
    route: "/admins",
    component: <Admins />,
  },
  {
    // type: "divider",
    name: "Add Admins",
    key: "add-admins",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/addadmins",
    component: <Addadmin />,
  },
  {
    // type: "divider",
    name: "Edit Admin",
    key: "edit-admins",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/editadmin",
    component: <Editadmin />,
  },
  {
    type: "collapse",
    name: "User Management",
    key: "users",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/users",
    component: <Users />,
    // collapse: [
    //   {
    //     type: "route",
    //     name: "Add User",
    //     key: "add-user",
    //     icon: <Icon fontSize="small">person_add</Icon>,
    //     route: "/users/addusers",
    //     component: <Adduser />,
    //   },
    //   {
    //     type: "route",
    //     name: "Edit User",
    //     key: "edit-user",
    //     icon: <Icon fontSize="small">edit</Icon>,
    //     route: "/users/edituser",
    //     component: <Edituser />,
    //   },
    // ],
  },
  {
    // type: "divider",
    name: "Add Users",
    key: "add-users",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/addusers",
    component: <Adduser />,
  },
  {
    // type: "divider",
    name: "Edit Users",
    key: "edit-users",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/edituser",
    component: <Edituser />,
  },
  {
    type: "collapse",
    name: "Banner Management",
    key: "banner",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-rounded">panorama</span>
      </Icon>
    ),
    route: "/banner",
    component: <Banner />,
  },
  {
    type: "collapse",
    name: "Category Management",
    key: "category",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">category</span>
      </Icon>
    ),
    route: "/category",
    component: <Category />,
  },
  {
    type: "collapse",
    name: "Tag Management",
    key: "tag",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">styler</span>
      </Icon>
    ),
    route: "/tag",
    component: <Tag />,
  },
  {
    type: "collapse",
    name: "Brand Management",
    key: "brand",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-sharp">branding_watermark</span>
      </Icon>
    ),
    route: "/brand",
    component: <Brand />,
  },
  {
    type: "collapse",
    name: "Material Management",
    key: "material",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">grid_4x4</span>
      </Icon>
    ),
    route: "/material",
    component: <Material />,
  },
  {
    type: "collapse",
    name: "Coupon Management",
    key: "coupon",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">discount</span>
      </Icon>
    ),
    route: "/coupon",
    component: <Coupon />,
  },
  {
    type: "collapse",
    name: "Product Management",
    key: "product",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">inventory</span>
      </Icon>
    ),
    route: "/product",
    component: <Product />,
  },
  {
    // type: "divider",
    name: "Add Product",
    key: "add-product",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/addproduct",
    component: <Addproduct />,
  },
  {
    // type: "divider",
    name: "Edit Product",
    key: "edit-product",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">group</span>
      </Icon>
    ),
    route: "/editproduct",
    component: <Editproduct />,
  },
  {
    type: "collapse",
    name: "Order Management",
    key: "order",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-sharp">list_alt</span>
      </Icon>
    ),
    route: "/order",
    component: <Order />,
  },
  {
    type: "collapse",
    name: "Order Cancellation",
    key: "order-cancel",
    icon: (
      <Icon fontSize="small">
        <span className="material-symbols-outlined">unsubscribe</span>
      </Icon>
    ),
    route: "/cancel",
    component: <Cancel />,
  },
  // {
  //   type: "collapse",
  //   name: "Order Request",
  //   key: "order-request",
  //   icon: (
  //     <Icon fontSize="small">
  //       <span className="material-symbols-outlined">unsubscribe</span>
  //     </Icon>
  //   ),
  //   route: "/request",
  //   component: <Request />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    // type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  //USER MODULE
  {
    // type: "divider",
    name: "Home",
    key: "home",
    route: "/home",
    component: <Home />,
  },
  {
    // type: "divider",
    name: "Shop",
    key: "shop",
    route: "/shop",
    component: <Shop />,
  },
  {
    // type: "divider",
    name: "Shop details",
    key: "shop-details",
    route: "/shopdetails",
    component: <Shopdetails />,
  },
  {
    // type: "divider",
    name: "Shop Cart",
    key: "shop-cart",
    route: "/shopcart",
    component: <Shopcart />,
  },
  {
    // type: "divider",
    name: "Wish List",
    key: "wish-list",
    route: "/wishlist",
    component: <Wishlist />,
  },
  {
    // type: "route",
    name: "Checkout",
    key: "checkout",
    route: "/checkout",
    component: <Checkout />,
  },
  {
    // type: "route",
    name: "Invoice",
    key: "invoice",
    route: "/invoice",
    component: <Invoice />,
  },
  {
    // type: "route",
    name: "Track",
    key: "track",
    route: "/track",
    component: <Track />,
  },
  {
    // type: "route",
    name: "userreg",
    key: "userreg",
    route: "/user/registration",
    component: <Userreg />,
  },
  {
    // type: "route",
    name: "forgot",
    key: "forgot",
    route: "/forgotpassword",
    component: <Forgot />,
  },
  {
    // type: "route",
    name: "otp",
    key: "otp",
    route: "/verifyotp",
    component: <Otp />,
  },
  {
    // type: "route",
    name: "reset",
    key: "reset",
    route: "/resetpassword",
    component: <Reset />,
  },
  {
    // type: "route",
    name: "About",
    key: "about",
    route: "/about",
    component: <About />,
  },
  {
    // type: "route",
    name: "Blog",
    key: "blog",
    route: "/blog",
    component: <Blog />,
  },
  {
    // type: "route",
    name: "Blog Details",
    key: "blog-details",
    route: "/blogdetails",
    component: <Blogdetails />,
  },
  {
    // type: "route",
    name: "Contact",
    key: "contact",
    route: "/contact",
    component: <Contact />,
  },
];

export default routes;
