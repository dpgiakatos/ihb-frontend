export interface User {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface UserList {
  users: User[];
  count: number;
}

export interface UserTabInfo {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Role {
  role: string;
}

export interface UserTab {
  info: UserTabInfo;
  role: Role[];
}
