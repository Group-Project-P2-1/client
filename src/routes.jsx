import { createBrowserRouter } from "react-router-dom";
import Login from "./assets/pages/login";
import GameRoom from "./pages/GameRoom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/gameRoom",
    element: <GameRoom />,
  },
]);

export default router;
