import cors from 'cors';
import express from 'express';
import router from './routes/routes.js';
import DBConnection from './database/db.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Initialize WebSocket server
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected from WebSocket');
  });
});

export const broadcastRankings = (rankings) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(rankings));
    }
  });
};

// Create HTTP server
const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

DBConnection();

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
