import { useState } from "react";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import UserContext from "./context/UserContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

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
    }
  ]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={appRouter} />
    </UserContext.Provider>
  );
};

export default App;
