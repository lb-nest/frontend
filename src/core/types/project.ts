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
  token: {
    token: string;
  };
  createdAt: string;
  updatedAt: string;
}
