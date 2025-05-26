type Receipt = {
  packageName: string;
  productId: string;
  purchaseToken: string;
  subscription: boolean;
};

type Platform = 'android' | 'ios';

export type { Receipt, Platform };
