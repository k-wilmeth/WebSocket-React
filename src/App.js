import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css';

const BACKEND_URL = 'http://localhost:<PORT>' // Replace <PORT> with the port your front-end client is running on

function App() {

  const [progress, setprogress] = useState(0);

  const socketRef = useRef(null);
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io.connect(BACKEND_URL);
      console.log('connected to socket');

      // Handle incoming messages from custom socket event "socket_data"
      socketRef.current.on("socket_data", data => {
        console.log(data);
        setprogress(data.progress);
      });

      socketRef.current.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    }

    return () => socketRef?.current?.disconnect();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>Progress: {progress}</p>
      </header>
    </div>
  );
}

export default App;
