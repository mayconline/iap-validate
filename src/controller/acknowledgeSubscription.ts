import { authGooglePlay } from '../services';

const { androidPublisher } = authGooglePlay();

type acknowledgeSubscriptionRequest = {
  acknowledgementState: number;
  productId: string;
  purchaseToken: string;
  packageName: string;
};

export async function acknowledgeSubscription({
  acknowledgementState,
  productId,
  purchaseToken,
  packageName,
}: acknowledgeSubscriptionRequest) {
  try {
    if (acknowledgementState === 0) {
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
