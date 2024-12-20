import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import socket from "../socket";
import { useRoom } from "../context/RoomContext";

const choices = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

export default function GameRoom() {
  const { roomId: paramRoomId } = useParams();
  const { roomId, setRoomId } = useRoom();
  const username = localStorage.getItem("username");
  const [move, setMove] = useState("");
  const [result, setResult] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!roomId) {
      setRoomId(paramRoomId);
    }
  }, [paramRoomId, roomId, setRoomId]);

  useEffect(() => {
    if (!roomId) return;

    socket.connect();

    socket.emit("join-room", { roomId, username });

    const handleWaitingOpponent = () => setWaiting(true);
    socket.on("waiting-opponent", handleWaitingOpponent);

    const handleStartGame = () => {
      setWaiting(false);
      setGameStarted(true);
    };
    socket.on("start-game", handleStartGame);

    const handleRoundResult = ({
      result,
      move1,
      move2,
      message,
      username1,
      username2,
    }) => {
      const isPlayer1 = username === username1;
      const userGesture = isPlayer1 ? move1 : move2;
      const opponentGesture = isPlayer1 ? move2 : move1;
      const opponentUsername = isPlayer1 ? username2 : username1;
      setResult({
        result,
        userGesture,
        opponentGesture,
        message,
        opponentUsername,
      });
      setShowModal(true);
    };
    socket.on("round-result", handleRoundResult);

    const handleOpponentDisconnect = () => {
      setWaiting(true);
    };
    socket.on("opponent-disconnected", handleOpponentDisconnect);

    return () => {
      socket.off("waiting-opponent", handleWaitingOpponent);
      socket.off("start-game", handleStartGame);
      socket.off("round-result", handleRoundResult);
      socket.off("opponent-disconnected", handleOpponentDisconnect);
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
  console.log(result);
  if (waiting) {
    return (
      <div
        className="container text-center d-flex align-items-center"
        style={{ width: "100vw", height: "80vh" }}
      >
        <div className="container">
          <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h3 className="text-primary">Waiting for opponent ...</h3>
            <div className="spinner-border text-primary mt-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container text-center d-flex align-items-center"
      style={{ width: "100vw", height: "80vh" }}
    >
      <div className="container d-flex justify-content-center align-items-center">
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
            <h2 style={{ color: "Cornsilk" }}>Player Name: {username}</h2>
          </div>

          <div className="mt-2 py-3">
            <h2>Choose your move!</h2>
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
          {gameStarted && !move && (
            <h3 className="mt-5">Waiting for your move...</h3>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h5 className="text-center">{result?.result}</h5> */}
          <h5
            className="text-center p-4"
            style={{
              fontSize: "60px",
              color: result?.message[username] === "You win!" ? "black" : "red",
            }}
          >
            {result?.message[username]}{" "}
          </h5>
          <h5
            className="text-center p-4"
            style={{ fontSize: "60px", color: "ForestGreen" }}
          >
            {result?.result}
          </h5>
          <p className="text-center">Your gesture: {result?.userGesture}</p>
          <p className="text-center">
            Gesture {result?.opponentUsername} : {result?.opponentGesture}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
