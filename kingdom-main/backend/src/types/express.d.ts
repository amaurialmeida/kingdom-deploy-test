import 'express';

declare module 'express' {
  export interface Request {
    userId: string;
    email: string;
    name: string;
    surname: string;
  }
}
