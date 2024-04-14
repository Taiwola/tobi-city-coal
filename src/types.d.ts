

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
  success: boolean;
};

interface IFlutterWavePayment {
  status: string;
  message: string;
  data: {
    link: string;
  };
}

interface IFlwData {
  event_type: string,
  data: {
    id: number;
  txRef: string;
  flwRef: string;
  amount: number;
  currency: "NGN" | "USD";
  appfee: number;
  merchantfee: number;
  IP: string;
  created_at: string;
  customer: {
    id: number;
    fullName: string;
    phone_number: string | null;
    email: string;
    created_at: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    AccountId: number;
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
  
}

interface IFlutterwavePaymentWebhook {
  event: "charge.completed";
  data: IFlwData;
}

interface IFlwVerification {
  status: "success";
  message: string;
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    device_fingerprint: string;
    amount: number;
    currency: string;
    charged_amount: number;
    app_fee: number;
    merchant_fee: number;
    processor_response: string;
    auth_model: string;
    ip: string;
    narration: string;
    status: "successful";
    payment_type: string;
    created_at: string;
    account_id: number;
    amount_settled: number;
    customer: {
      id: number;
      name: string;
      phone_number: string;
      email: string;
      created_at: string;
    };
  };
}

interface IFlwError {
  status: "error";
  message: string;
  data: null;
}
