export interface User {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface UserList {
  users: User[];
  count: number;
}

export interface UserTab {
  email: string;
  firstName: string;
  lastName: string;
}
