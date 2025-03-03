import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";

const app = new Hono();

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const webSocketApp = app.get(
  "/ws",
  upgradeWebSocket((c) => ({
    onOpen: () => {
      console.log("Connection opened");
    },

    onMessage(event, ws) {
      console.log(`Message from client: ${event.data}`);
      ws.send("Hello from server!");
    },

    onClose: () => {
      console.log("Connection closed");
    },
  })),
);

export type WebSocketApp = typeof webSocketApp;

export default {
  fetch: app.fetch,
  websocket,
  port: 5000,
};
