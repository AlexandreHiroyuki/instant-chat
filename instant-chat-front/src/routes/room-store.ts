import { writable } from 'svelte/store';

export const isNew = writable(false);
export const roomCode = writable(
	''
	// ,() => {
	// 	console.log('got a subscriber');
	// 	return () => console.log('no more subscribers');
	// }
);
function createUsers() {
	const { subscribe, set, update } = writable(['']);

	return {
		subscribe,
		add: (user: string) => update((users) => [...users, user]),
		remove: (user: string) => update((users) => users.filter((u) => u !== user))
	};
}
export const users = createUsers();

export const messages = writable([]);

export default {
	isNew,
	roomCode,
	users,
	messages
};
