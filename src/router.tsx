import { createBrowserRouter } from "react-router-dom";
import Login from './Component/login';
import Landing from './landing';
import User from './Component/User/User';
import AddUser from './Component/User/AddUser';
import Transport from './Component/Transport/Transport';
import AddArticlePage from './Component/Articles/AddArticlePage';
import ArticlePage from './Component/Articles/ArticlePage';
const router = createBrowserRouter([
  // common Routes
  {
    path: "",
    element: (<Login />),
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/landing",
    element: (<Landing />),
  },
  {
    path: "/user",
    element: (<User />),
  },
  {
    path: "/adduser",
    element: (<AddUser />),
  },
  {
    path: "/transport",
    element: (<Transport />),
  },
  {
    path: "/addarticle",
    element: (<AddArticlePage />),
  },
  {
    path: "/articles",
    element: (<ArticlePage />),
  },
]);

export default router;