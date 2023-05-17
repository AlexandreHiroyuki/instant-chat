import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL: string = process.env.SOCKET_URL;

export const socket = io(URL, {
	autoConnect: false
});
