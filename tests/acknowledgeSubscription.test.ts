import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { acknowledgeSubscription } from '../src/controller/acknowledgeSubscription';
import * as services from '../src/services';

const getMockedAndroidPublisher = (acknowledgeMock: any) => ({
  purchases: {
    subscriptions: {
      acknowledge: acknowledgeMock as any,
    } as any,
  },
});

describe('acknowledgeSubscription', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call androidPublisher.purchases.subscriptions.acknowledge when acknowledgementState is 0', async () => {
    const acknowledgeMock = jest.fn(() => Promise.resolve(undefined));
    jest.spyOn(services, 'authGooglePlay').mockReturnValue({
      androidPublisher: getMockedAndroidPublisher(acknowledgeMock),
    } as any);

    await acknowledgeSubscription({
      acknowledgementState: 0,
      productId: 'prod',
      purchaseToken: 'token',
      packageName: 'pkg',
    });

    expect(acknowledgeMock).toHaveBeenCalled();
  });

  it('should not call acknowledge if acknowledgementState is not 0', async () => {
    const acknowledgeMock = jest.fn(() => Promise.resolve(undefined));

    jest.spyOn(services, 'authGooglePlay').mockReturnValue({
      androidPublisher: getMockedAndroidPublisher(acknowledgeMock),
    } as any);

    await acknowledgeSubscription({
      acknowledgementState: 1,
      productId: 'prod',
      purchaseToken: 'token',
      packageName: 'pkg',
    });

    expect(acknowledgeMock).not.toHaveBeenCalled();
  });
});
