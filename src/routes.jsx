import { createBrowserRouter } from "react-router-dom";
import Login from "./assets/pages/login";
import GameRoom from "./pages/GameRoom";
import ListRoom from "./pages/ListRoom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/listRoom",
    element: <ListRoom />,
  },
  {
    path: "/gameRoom",
    element: <GameRoom />,
  },
]);

export default router;
