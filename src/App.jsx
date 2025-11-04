import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserContext from "./context/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import UpdateProfile from "./components/UpdateProfile";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  const [user, setUser] = useState(null);

  const appRouter = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/", 
      element: <SignUp />,
    },
    {
      path: '/home',
      element: <Home />
    },
    {
    path: '/update',
    element: <UpdateProfile />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    }
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={appRouter} />
    </UserContext.Provider>
  );
};

export default App;
