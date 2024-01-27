export interface IParishioner {
  firstName: string;
  lastName: string;
  address: string;
  occupation: string;
  dateOfBirth: string;
  phoneNumber?: string;
  gender?: string;
  email?: string;
  baptized: boolean;
  confirmed: boolean;
  communicant: boolean;
  parishionerId: string;
}
