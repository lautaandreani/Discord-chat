import { useState } from "react";
//Components
import Login from "./views/Login";
import SideBar from "./views/SideBar";
import ChatScreen from "./views/ChatScreen";
//Firebase
import app from "./firebase/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(app);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);
  onAuthStateChanged(auth, (UsuarioFirebase) => {
    //Revisar si se inició sesión o se cerró
    if (UsuarioFirebase) {
      setUsuarioGlobal(UsuarioFirebase);
    } else {
      setUsuarioGlobal(null);
    }
  });
  return (
    <div className="app">
      {usuarioGlobal ? (
        <>
          <SideBar
            usuarioGlobal={usuarioGlobal}
            setActiveChannel={setActiveChannel}
          />
          <ChatScreen
            activeChannel={activeChannel}
            usuarioGlobal={usuarioGlobal}
          />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
