import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Avatar } from "@material-ui/core";
import { ExpandMore, Add, Mic, Headset, ExitToApp } from "@material-ui/icons";
import SideBarChannels from "../components/SideBarChannels";
//Firebase
import app from "../firebase/credentials";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
const db = getFirestore(app);
//Log Out
const auth = getAuth(app);
const SideBar = ({ usuarioGlobal, setActiveChannel }) => {
  const [channelsList, setChannelsList] = useState([]);

  const handleGetChannel = async () => {
    const channelsArr = [];
    const collectionRef = collection(db, "canales");
    const channels = await getDocs(collectionRef);
    channels.forEach((channelInfo) => {
      channelsArr.push(channelInfo.data());
    });
    setChannelsList(channelsArr);
  };
  //Llamar a firebase para obtener canales creados
  useEffect(() => {
    handleGetChannel();
  }, []);

  const handleChannel = () => {
    const channelName = prompt("Por favor ingresa el nombre del canal");
    if (channelName) {
      const docRef = doc(db, `canales/${channelName}`);
      setDoc(docRef, {
        id: uuid(),
        name: channelName,
      });
    }
    handleGetChannel();
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Bienvenidx {usuarioGlobal.displayName.split(" ", 1)} 🤙</h3>
        <ExpandMore />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore />
            <h4>Canales de texto</h4>
          </div>
          <Add className="sidebar__addChannel" onClick={handleChannel} />
        </div>
        <div className="sidebar__channelsList">
          {channelsList
            ? channelsList.map((channel) => {
                return (
                  <div
                    onClick={() => setActiveChannel(channel.name)}
                    key={channel.id}
                  >
                    <SideBarChannels channel={channel.name} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={usuarioGlobal.photoURL} />
        <div className="sidebar__profileInfo">
          <h3>{usuarioGlobal.displayName}</h3>
          <small># {usuarioGlobal.uid.substring(0, 4)}</small>
        </div>
        <div className="sidebar__profileIcons">
          <Mic fontSize="large" />
          <Headset fontSize="large" />
          <ExitToApp
            fontSize="large"
            color="secondary"
            style={{ cursor: "pointer" }}
            onClick={() => signOut(auth)}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
