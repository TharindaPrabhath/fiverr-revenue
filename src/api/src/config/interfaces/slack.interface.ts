export interface SlackMessage {
  message?: string;
  status?: string;
  messageType?: string;
  messageLevel?: string;
  functionName?: string;
  context?: string;
  env: string;
  currency?: string;
  orderId?: string;
  amount?: string;
  requestId?: string;
  accountNumber?: string;
  invoiceNumbers?: string;
}
