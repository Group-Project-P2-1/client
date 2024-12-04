import { io } from "socket.io-client";

const socket = io("https://rps.ludbakazar.my.id", {
  autoConnect: false,
});

export default socket;
