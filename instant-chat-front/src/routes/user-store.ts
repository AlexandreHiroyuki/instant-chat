import { writable } from 'svelte/store';

export const nickname = writable('');
export const password = writable('');

export default {
	nickname,
	password
};
