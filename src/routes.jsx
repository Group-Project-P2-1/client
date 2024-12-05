import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import GameRoom from "./pages/GameRoom";
import ListRoom from "./pages/ListRoom";
import MainLayout from "./pages/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    loader: () => {
      if (!localStorage.username) {
        return redirect("/login")
      }
      return null
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/listRoom",
        element: <ListRoom />,
      },
      {
        path: "/gameroom/:roomId",
        element: <GameRoom />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
    loader: () => {
      if (localStorage.username) {
        return redirect("/")
      }
      return null
    },
  }
]);

export default router;
