import { useState, useEffect, useRef } from "react";

import { AddCircle, CreditCard, Gif, EmojiEmotions } from "@material-ui/icons";
import { v4 as uuid } from "uuid";
import EncabezadoChatScreen from "../components/EncabezadoChatScreen";
import Mensaje from "../components/Mensaje";

import app from "../firebase/credentials";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
} from "firebase/firestore";
const firestore = getFirestore(app);

const ChatScreen = ({ activeChannel, usuarioGlobal }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [listMessages, setListMessages] = useState([]);
  //Scrollear al último mensaje
  const anchor = useRef();
  //Filtro malas palabras
  const contentFilter = (text) => {
    const badWords = [
      "boludo",
      "puto",
      "hdp",
      "tonto",
      "idiota",
      "estúpido",
      "nazi",
    ];
    const arr = text.split(" ");
    arr.forEach((palabra, i) => {
      if (badWords.includes(palabra)) {
        arr[i] = "*****";
      }
    });
    return arr.join(" ");
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const docRef = doc(
      firestore,
      `canales/${activeChannel}/mensajes/${new Date().getTime()}`
    );
    //Filtrar palabras
    const shitsFilter = contentFilter(inputMessage);
    setDoc(docRef, {
      foto: usuarioGlobal.photoURL,
      usuario: usuarioGlobal.displayName,
      mensaje: shitsFilter,
      id: new Date().getTime(),
    });
    setInputMessage("");
    getListMessages();
    anchor.current.scrollIntoView({ behavior: "smooth" });
  };

  const getListMessages = async () => {
    const messagesArr = [];
    const collectionRef = collection(
      firestore,
      `canales/${activeChannel}/mensajes`
    );
    const messagesFirebase = await getDocs(collectionRef);
    messagesFirebase.forEach((message) => {
      messagesArr.push(message.data());
    });
    setListMessages([...messagesArr]);
  };

  useEffect(() => {
    getListMessages();
    //eslint-disable-next-line
  }, [activeChannel]);

  return (
    <div className="chat">
      <div>
        <EncabezadoChatScreen activeChannel={activeChannel} />
      </div>
      <div className="chat__messages">
        {listMessages
          ? listMessages.map((mensajeFirebase) => {
              return <Mensaje mensajeFirebase={mensajeFirebase} key={uuid()} />;
            })
          : null}
        <div ref={anchor} style={{ marginBottom: "75px" }}></div>
      </div>
      <div className="chat__input">
        <AddCircle fontSize="large" />
        <form onSubmit={sendMessage}>
          <input
            type="text"
            disabled={activeChannel !== "Home" ? false : true}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Enviar mensaje a # ${activeChannel || ""}`}
          />
          <button
            disabled={activeChannel ? false : true}
            className="chat__inputButton"
            type="submit"
          >
            Enviar mensaje
          </button>
        </form>
        <div className="chat__inputIcons">
          <CreditCard fontSize="large" />
          <Gif fontSize="large" />
          <EmojiEmotions fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
