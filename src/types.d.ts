type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  age: string;
  gender: string;
  state: string;
  lga: string;
  term: boolean;
};

type Payment = {
  id: string;
  // update the types to add user
  user: User;
  reference: string;
  status: "pending" | "successful" | "failed";
};

type CustomError = {
  message: string;
};

interface IFlutterWavePayment {
  status: string;
  message: string;
  data: {
    link: string;
  };
}

interface IFlwData {
  id: number;
  txRef: string;
  flwRef: string;
  device_fingerprint: string;
  amount: number;
  currency: "NGN" | "USD";
  charged_amount: number;
  app_fee: number;
  merchant_fee: number;
  processor_response: string;
  auth_model: string;
  IP: string;
  narration: string;
  status: "successful" | "failed";
  payment_type: string;
  created_at: string;
  account_id: number;
  customer: {
    id: number;
    name: string;
    phone_number: string | null;
    email: string;
    created_at: string;
  };
  card: {
    first_6digits: string;
    last_4digits: string;
    issuer: string;
    country: string;
    type: string;
    expiry: string;
  };
}

interface IFlutterwavePaymentWebhook {
  event: "charge.completed";
  data: IFlwData;
}

interface IFlwVerification {
  status: "success";
  message: string;
  data: IFlwData;
}

interface IFlwError {
  status: "error";
  message: string;
  data: null;
}
