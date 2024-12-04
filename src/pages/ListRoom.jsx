import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Button,
    Card,
    Row,
    Col
} from "react-bootstrap";
import { useRoom } from "../context/RoomContext";

export default function listRoom() {
    const navigate = useNavigate();
    const {setRoomId} = useRoom()
    const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

    const handleEnterRoom = (id) => {
        setRoomId(id);
        navigate(`/gameroom/${id}`)
    }

    return (
        <div
            style={{
                backgroundImage: `url('https://64.media.tumblr.com/193f3c65b3c12829776a35275096939e/6f2fa1b223ad6d2e-97/s540x810/a93da76b4184da55b2f485d3d2303335eeac8bda.pnj')`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                height: "100vh",
                padding: "32px",
                overflowY: "auto",
            }}
        >
        <div className="text-center">
            <p className="text-white fs-2 fw-bolder">Room List</p>
        </div>

        <Row className="g-4 mt-4">
            {data.map((el) => (
                <Col key={el} xs={6} sm={4} md={3}>
                    <Card className="text-center rounded-5" style={{ width: "100%" }}>
                        <Card.Body>
                            <Card.Title>Room {el}</Card.Title>
                            <Card.Text>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ba2c2c" 
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </Card.Text>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                className="rounded-pill"
                                onClick={() => handleEnterRoom(el)}
                            >
                                Enter Room
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
        </div>
    );
}
