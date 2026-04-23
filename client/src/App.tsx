import { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3000");
function App() {
  const [message, setMessage] = useState("");
  function sendMessage() {
    socket.emit("send_message", { message: message });
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Chat Application</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
