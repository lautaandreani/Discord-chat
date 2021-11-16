import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhhUllJRY_Tus5D98EBnCOVYE3h11wLzA",
  authDomain: "discord-chat-app.firebaseapp.com",
  projectId: "discord-chat-app",
  storageBucket: "discord-chat-app.appspot.com",
  messagingSenderId: "475086448771",
  appId: "1:475086448771:web:56f9b2d41743e2741653b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;