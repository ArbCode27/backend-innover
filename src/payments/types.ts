export type InvoicingPaymentResponse = {
  status: number;
  meta: {
    object: string; // "invoicing_payment"
  };
  data: {
    id: string;
    public_id: number;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    state: 'success' | 'failed' | 'pending'; // puedes ampliar según estados posibles
    amount: string;
    comment: string | null;
    name_user: string;
    email_user: string | null;
    client_id: string;
    client_name: string;
    client_public_id: number;
    payment_date: string; // ISO date string
    credit_amount: string;
    name_collector: string;
    email_collector: string | null;
    transaction_kind: string;
    transaction_code: string | null;
    payment_transactions: any[]; // si conoces la estructura, reemplaza `any`
  };
  errors?: Record<string, string>; // cualquier campo con mensaje de error
};

export type InvoicingPayment = {
  id: string;
  public_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  state: 'success' | 'failed' | 'pending'; // puedes ampliar según estados posibles
  amount: string;
  comment: string | null;
  name_user: string;
  email_user: string | null;
  client_id: string;
  client_name: string;
  client_public_id: number;
  payment_date: string; // ISO date string
  credit_amount: string;
  name_collector: string;
  email_collector: string | null;
  transaction_kind: string;
  transaction_code: string | null;
  payment_transactions: any[]; // si conoces la estructura, reemplaza `any`
};
