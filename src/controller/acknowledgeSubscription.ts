import { authGooglePlay } from '../services';
import type { acknowledgeSubscriptionRequest } from '../types';

export async function acknowledgeSubscription({
  acknowledgementState,
  productId,
  purchaseToken,
  packageName,
}: acknowledgeSubscriptionRequest) {
  try {
    if (acknowledgementState === 0) {
      const { androidPublisher } = authGooglePlay();

      await androidPublisher.purchases.subscriptions.acknowledge({
        packageName,
        subscriptionId: productId,
        token: purchaseToken,
      });
    }
  } catch (error: any) {
    throw new Error(
      `Failed to acknowledge subscription: ${error || 'Unknown error'}`
    );
  }
}
