type Receipt = {
  packageName: string;
  productId: string;
  purchaseToken: string;
  subscription: boolean;
};

type Platform = 'ANDROID' | 'IOS';

type PurchaseData = {
  service: string;
  status: number;
  packageName: string;
  productId: string;
  purchaseToken: string;
  startTimeMillis: number;
  expiryTimeMillis: number;
  autoRenewing: boolean;
  priceCurrencyCode: string;
  priceAmountMicros: number;
  countryCode: string;
  developerPayload: null | string;
  cancelReason: number;
  orderId: string;
  purchaseType: number;
  acknowledgementState: number;
  kind: string;
  transactionId: string;
  quantity: number;
  expirationDate: string;
  cancellationDate: string;
};

type ValidateReceiptIAP = {
  service: string;
  status: number;
  packageName: string;
  productId: string;
  purchaseToken: string;
  startTimeMillis: string;
  expiryTimeMillis: string;
  autoRenewing: boolean;
  priceCurrencyCode: string;
  priceAmountMicros: string;
  countryCode: string;
  developerPayload: string;
  cancelReason: number;
  orderId: string;
  purchaseType: number;
  acknowledgementState: number;
  kind: string;
};

type ValidatedProductPurchaseResponse = {
  valid: boolean;
  data?: {
    platform: Platform;
  } & PurchaseData;
};

type acknowledgeSubscriptionRequest = {
  acknowledgementState: number;
  productId: string;
  purchaseToken: string;
  packageName: string;
};

export type {
  Receipt,
  Platform,
  PurchaseData,
  ValidateReceiptIAP,
  ValidatedProductPurchaseResponse,
  acknowledgeSubscriptionRequest,
};
