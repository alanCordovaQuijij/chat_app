import { io, Socket } from "socket.io-client";
import { ENV } from "./constanst";

export let socket: Socket | null = null;

export const initSockets = () => {
    socket = io(ENV.SOCKET_URL);
};
