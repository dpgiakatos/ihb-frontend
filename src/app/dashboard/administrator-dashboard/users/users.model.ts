export interface User {
  firstName: string;
  lastName: string;
}

export interface UserList {
  users: User[];
  count: number;
}
