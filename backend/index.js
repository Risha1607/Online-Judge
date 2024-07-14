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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

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

const server = http.createServer(app);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Configure CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'https://online-judge-5hahn0xv4-rishas-projects-afb1f20c.vercel.app', 'https://codeconquest.online'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router);

DBConnection();

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
