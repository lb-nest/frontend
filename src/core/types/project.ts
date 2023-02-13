export enum BillingType {
  Free = 'Free',
  Paid = 'Paid',
}

export enum AccessLevel {
  User = 'User',
  Admin = 'Admin',
  Owner = 'Owner',
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  users: Array<{
    accessLevel: AccessLevel;
  }>;
  createdAt: string;
  updatedAt: string;
}
