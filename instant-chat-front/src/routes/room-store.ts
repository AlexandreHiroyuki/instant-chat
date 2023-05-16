import { writable } from 'svelte/store';

const roomCode = writable(
	''
	// ,() => {
	// 	console.log('got a subscriber');
	// 	return () => console.log('no more subscribers');
	// }
);
const users = writable([]);
const messages = writable([]);

export default {
	roomCode,
	users,
	messages
};
