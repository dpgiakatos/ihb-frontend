export interface ContactInbox {
  id: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactInboxList {
  contacts: ContactInbox[];
  count: number;
}
