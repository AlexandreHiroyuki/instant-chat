import { writable } from 'svelte/store';

export const chatRoomStore = writable(
	{
		code: '',
		users: [],
		messages: []
	},
	() => {
		console.log('got a subscriber');
		return () => console.log('no more subscribers');
	}
);
