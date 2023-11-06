import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

const BACKEND_URL = 'http://localhost:3003' // Replace with PORT of the back-end server

function App() {

  const [progress, setProgress] = useState(0);

  const socketRef = useRef(null);
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io.connect(BACKEND_URL);
      console.log('connected to socket');

      // Handle incoming messages from custom socket event "socket_data"
      socketRef.current.on("fts_data", data => {
        setProgress(data);
      });

      socketRef.current.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    }

    return () => socketRef?.current?.disconnect();
  }, [])

  const triggerRealtimeData = async () => {
    const response = await axios.get(`${BACKEND_URL}/trigger`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={triggerRealtimeData}>Get Data</button>
        <p>Progress: {progress}%</p>
      </header>
    </div>
  );
}

export default App;
