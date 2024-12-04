import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
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
    path: "/gameroom/:roomId",
    element: <GameRoom />,
  },
]);

export default router;
