import { writable } from 'svelte/store';

export const userStore = writable(
	{
		nickname: String,
		password: String
	},
	() => {
		console.log('got a subscriber');
		return () => console.log('no more subscribers');
	}
);
