import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { socket } from './socket';

// Initialize socket connection
socket.connect();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Use the socket instance from the imported file
socket.on('connect', () => {
  console.log('Connected to server');
});
