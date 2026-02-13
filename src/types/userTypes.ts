export type UserRole = "buyer" | "seller";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
