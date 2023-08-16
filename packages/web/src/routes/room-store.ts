import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Message } from './chat'

export const isNew = writable(false)
export const roomCode = writable(
  ''
  // ,() => {
  // 	console.log('got a subscriber');
  // 	return () => console.log('no more subscribers');
  // }
)
function createUsers() {
  const { subscribe, update } = writable([''])

  return {
    subscribe,
    add: (user: string) => update(users => [...users, user]),
    remove: (user: string) => update(users => users.filter(u => u !== user)),
    clear: () => update(() => [])
  }
}
export const users = createUsers()

function createMessageHistory() {
  const { subscribe, update }: Writable<Message[]> = writable([])

  return {
    subscribe,
    add: (message: Message) => update(messages => [...messages, message]),
    clear: () => update(() => [])
  }
}
export const messageHistory = createMessageHistory()

export default {
  isNew,
  roomCode,
  users,
  messageHistory
}
