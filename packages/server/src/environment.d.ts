declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      CLIENT_ORIGIN: string
      PORT: number
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
