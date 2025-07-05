import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const BroadcastToast = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7044/broadcastHub") // adjust URL if needed
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");

        connection.on("OrderPlaced", (msg: string) => {
          setMessage(msg);

          // Hide after 12 seconds
          setTimeout(() => {
            setMessage(null);
          }, 12000);
        });
      })
      .catch((err) => console.error("SignalR connection error:", err));

    return () => {
      connection.stop();
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-md z-50">
      {message}
    </div>
  );
};

export default BroadcastToast;
