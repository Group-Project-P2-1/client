import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import { RoomProvider } from "./context/RoomContext.jsx";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <RoomProvider>
      <RouterProvider router={router} />
    </RoomProvider>
  // </StrictMode>
);
