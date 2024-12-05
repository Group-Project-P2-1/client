import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div
            style={{
                backgroundColor: "#fffaff",
                height: '100vh',
                overflowY: "auto",
            }}
        >
            <Navbar/>
            <Outlet/>
        </div>
    )
}