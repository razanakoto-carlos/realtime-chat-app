import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Chat/>} />
      <Route path="/register" element={ <Register/>} />
      <Route path="/login" element={ <Login/>} />
    </Routes>
  );
}

export default App;
