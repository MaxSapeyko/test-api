declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_NAME: string;
    }
  }
}

declare interface UserProps {
  _id: number;
  email: string;
  firstName: string;
  lastName: string;
  pass: string;
  repositoriesUrl: string;
  tasks: String[] | [];
  _v: number;
}
