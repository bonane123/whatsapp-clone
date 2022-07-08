import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/rooms/:roomId" element={<Chat />} />
              {/* <Route path="/" /> */}
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
