import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Image from 'react-bootstrap/Image';

function NavbarLayout() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    function logout() {
        localStorage.clear()
        navigate("login")
    }

    return (
        <Navbar 
            expand="lg" 
            className="bg-body-tertiary px-4 justify-content-between" 
            style={{
                backgroundImage: 'linear-gradient(to right, #412bd1 0%, #be95be 100%)'
            }}
        >
            <Navbar.Brand href="#home" onClick={() => navigate("/")} className="d-flex align-items-center gap-3">
                <Image src="/suit-logo.png" rounded width='50px'/>
                <div className="text-white fw-bold">RPS Battle</div>
            </Navbar.Brand>
            <DropdownButton
                variant="success"
                title={`Player: ${username}`}
                align="end"
                className="justify-content-end"
            >
                <Dropdown.Item onClick={logout}>Quit Game</Dropdown.Item>
            </DropdownButton>
        </Navbar>
    );
}

export default NavbarLayout;