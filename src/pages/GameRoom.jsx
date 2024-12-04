import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import socket from "../socket";

const choices = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

export default function GameRoom() {
  const { roomId } = useParams();
  const username = localStorage.getItem("username");
  const [move, setMove] = useState("");
  const [result, setResult] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.emit("join-room", { roomId, username });

    const handleWaitingOpponent = () => setWaiting(true);
    socket.on("waiting-opponent", handleWaitingOpponent);

    const handleStartGame = () => {
      setWaiting(false);
      setGameStarted(true);
    };
    socket.on("start-game", handleStartGame);
    const handleRoundResult = (data) => {
      setResult(data);
      setShowModal(true);
    };
    socket.on("round-result", handleRoundResult);

    return () => {
      socket.off("waiting-opponent", handleWaitingOpponent);
      socket.off("start-game", handleStartGame);
      socket.off("round-result", handleRoundResult);
      socket.disconnect();
    };
  }, [roomId, username]);

  const handleMove = (choice) => {
    if (!move) {
      setMove(choice);
      socket.emit("make-move", { roomId, move: choice });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMove(""); 
    setResult(null); 
  };

  if (waiting) {
    return (
      <div className="container" style={{ width: "200vh" }}>
        <div className="container">
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h3 className="text-primary">Sedang menunggu lawan ...</h3>
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ width: "200vh" }}>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div
          className="p-5 text-center"
          style={{
            backgroundColor: "Teal",
            borderRadius: "10px",
            color: "white",
            width: "800px",
            height: "500px",
          }}
        >
          <div className="mb-3">
            <h1 style={{ fontSize: "70px" }}>Room {roomId}</h1>
            <h2 style={{ color: "Cornsilk" }}>Nama Pemain: {username}</h2>
          </div>

          <div className="mt-2 py-3">
            <h2>Silahkan Pilih Gerakan!</h2>
          </div>
          <div
            className="d-flex justify-content-center gap-3 mb-2 mt-2"
            style={{ height: "100px" }}
          >
            {choices.map((choice) => (
              <button
                key={choice.name}
                className="btn btn-primary btn-lg w-50"
                onClick={() => handleMove(choice.name)}
                disabled={move}
              >
                <div style={{ fontSize: "60px" }}>{choice.emoji}</div>
              </button>
            ))}
          </div>
          {gameStarted && !move && <h3 className="mt-5">Sedang menunggu gerakan...</h3>}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hasil Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center">{result?.result}</h5>
          <p className="text-center">Gerakan Anda: {result?.move1}</p>
          <p className="text-center">Gerakan Lawan: {result?.move2}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Tutup
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
