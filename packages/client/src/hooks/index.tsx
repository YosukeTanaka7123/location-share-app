import { hc } from "hono/client";
import type { WebSocketApp } from "location-share-app-server";
import { useEffect } from "react";

export const useSubscription = () => {
  useEffect(() => {
    const client = hc<WebSocketApp>("http://localhost:5000");
    const socket = client.ws.$ws(); // A WebSocket object for a client

    let intervalId: Timer;
    socket.onopen = () => {
      // 一定間隔でメッセージを送信
      intervalId = setInterval(() => {
        const message = JSON.stringify({
          clientTime: new Date().toISOString(),
        });
        socket.send(message);
      }, 3000);

      // メッセージを受信
      socket.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
      };

      // クリーンアップ時に送信を停止
      return () => clearInterval(intervalId);
    };

    socket.onclose = () => {
      console.log("closed");
    };

    // クリーンアップ関数
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      socket.close();
    };
  }, []);
};
