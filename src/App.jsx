import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import BlogPage from "./Components/BlogPage/BlogPage";
import LayoutPage from "./Components/LayoutPage/LayoutPage";
import PostDetails from "./Components/PostDetails/PostDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/posts/:slug",
        element: <PostDetails />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
