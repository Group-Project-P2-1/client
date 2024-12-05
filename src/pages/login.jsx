import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/");
  }

  return (
    <div 
      className="form-container"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/000/691/489/non_2x/retro-offset-rock-paper-scissors-icons-vector.jpg')`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        height: "80vh",
        padding: "32px",
        overflowY: "auto",
      }}  
    >

      <form onSubmit={handleSubmit} className="login-form">
        <div className="text-center">
          <Image src="/suit-logo.png" rounded width='50px'/>
          <h2 className="text-center mt-4">RPS Battle</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Let's Play
        </button>
      </form>
    </div>
  );
}
