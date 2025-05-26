import { authGooglePlay } from '../services';
import type { Platform } from '../types';

const { androidPublisher } = authGooglePlay();

type validateSubscriptionRequest = {
  acknowledgementState: number;
  platform: Platform;
  productId: string;
  purchaseToken: string;
  packageName: string;
};

export async function validateSubscription({
  platform,
  acknowledgementState,
  productId,
  purchaseToken,
  packageName,
}: validateSubscriptionRequest) {
  try {
    if (platform === 'android' && acknowledgementState === 0) {
      await androidPublisher.purchases.subscriptions.acknowledge({
        packageName,
        subscriptionId: productId,
        token: purchaseToken,
      });
    }
  } catch (error: any) {
    return {
      valid: false,
      error: error.message || 'Unknown acknowledgement error',
    };
  }
}
