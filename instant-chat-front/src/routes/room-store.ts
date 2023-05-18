import { writable } from 'svelte/store';

export const isNew = writable(false);
export const roomCode = writable(
	''
	// ,() => {
	// 	console.log('got a subscriber');
	// 	return () => console.log('no more subscribers');
	// }
);
export const users = writable([]);
export const messages = writable([]);

export default {
	isNew,
	roomCode,
	users,
	messages
};
