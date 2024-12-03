import { useState, useEffect } from "react";
import Home from './pages/Home';
import socket from "./socket";
import './index.css';


function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
