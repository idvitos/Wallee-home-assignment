export interface User {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  apartment?: string | undefined;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  phone?: string | undefined;
}