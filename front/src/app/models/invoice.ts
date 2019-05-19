export interface Invoice {
  discount: {
    value: string; // required
    percentage: number;
    expirationDate: string;
    discountType: string; // do not send, only frontend
  };
  payment: {
    date: string,
    manual: boolean
  };
  clientName: string;
  person: string; // do not sent, onyle frontend
  clientIdentificationNumber: string;
  clientId: string; // required
  value: string;
  status: string;
  id: string;
  email: string; // required
  line1: string;
  expirationDate: string; // required
  line2: string;
}
