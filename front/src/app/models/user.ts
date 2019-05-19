export interface PhoneNumbers {
  number: string;
  type: string;
}

export interface User {
  name: string;
  identificationNumber: string;
  email: string;
  password: string;
  address: {
    cep: string;
    district: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
  };
  phoneNumbers: Array<PhoneNumbers>;
  birthdate: string;
  notificationURL: string;
  stateRegistration: number;
  municipalRegistration: number;
  hasDigitalAccount: boolean;
  token: string;
  person: string; // do not send, only frontend
  confirmPassword: string; // do not send, only frontend
}
