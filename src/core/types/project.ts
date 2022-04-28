export enum BillingType {
  Free = 'Free',
  Paid = 'Paid',
}

export enum RoleType {
  User = 'User',
  Admin = 'Admin',
  Owner = 'Owner',
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  billing: {
    type: BillingType;
  };
  roles: Array<{
    role: RoleType;
  }>;
  createdAt: string;
  updatedAt: string;
}
