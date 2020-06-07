export interface Application {
  id: string;
  userId: string;
  suffix: string;
  createdTime: string;
  firstName: string;
  lastName: string;
}

export interface CountApplications {
  count: number;
}

export interface ApplicationList {
  applications: Application[];
  count: CountApplications[];
}
