export interface Application {
  id: string;
  userId: string;
  suffix: string;
  createdTime: string;
  firstName: string;
  lastName: string;
}

export interface ApplicationList {
  applications: Application[];
  count: number;
}
