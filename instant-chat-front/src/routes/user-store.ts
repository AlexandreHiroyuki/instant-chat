import { writable } from 'svelte/store';

const nickname = writable('');
const password = writable('');

export default {
	nickname,
	password
};
