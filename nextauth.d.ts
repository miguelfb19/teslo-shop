import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      emailVerified?: boolean;
      image?: string;
      role: string;
    } & DefaultSession["user"];
  }
}
