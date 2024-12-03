import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import io from "socket.io-client";
import { 
    Button,
    Card,
    Spinner 
} from "react-bootstrap";

const socket = io("http://localhost:3000");

export default function listRoom() {
    // const { roomId } = useParams();
    const username = localStorage.getItem("username");
    const [waiting, setWaiting] = useState(false);

    if (waiting) {
        return (
        <div  style={{height: "100vh"}} className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        );
    }

    return (
        <div 
            style={{ 
                backgroundImage: `url('https://64.media.tumblr.com/193f3c65b3c12829776a35275096939e/6f2fa1b223ad6d2e-97/s540x810/a93da76b4184da55b2f485d3d2303335eeac8bda.pnj')`, 
                backgroundSize: 'cover', 
                height: '100vh' 
            }}
            class="container text-center"
        >

            <Card style={{ width: '18rem' }} role="button">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </div>
    );
}
