import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { validateProductPurchase } from '../src/controller/validateProductPurchase';
import * as services from '../src/services';
import * as controller from '../src/controller/acknowledgeSubscription';
import * as validation from '../src/validation';
import type { ValidateReceiptIAP, PurchaseData } from '../src/types';

const mockRequest = (body: any) => ({ body } as any);
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockPurchaseData: PurchaseData = {
  service: 'google',
  status: 0,
  packageName: 'pkg',
  productId: 'test',
  purchaseToken: 'token',
  startTimeMillis: 0,
  expiryTimeMillis: 0,
  autoRenewing: false,
  priceCurrencyCode: 'USD',
  priceAmountMicros: 0,
  countryCode: 'US',
  developerPayload: null,
  cancelReason: 0,
  orderId: 'order',
  purchaseType: 0,
  acknowledgementState: 0,
  kind: '',
  transactionId: 'tx',
  quantity: 1,
  expirationDate: '',
  cancellationDate: '',
};

describe('validateProductPurchase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 and valid purchase for valid input', async () => {
    jest.spyOn(services, 'initializeIAP').mockReturnValue({
      iap: {
        setup: () => Promise.resolve(),
        validate: jest.fn(),
        getPurchaseData: jest.fn(),
      } as any,
    });
    jest.spyOn(services, 'validateReceipt').mockResolvedValue({
      service: 'google',
      status: 0,
      packageName: 'pkg',
      productId: 'test',
      purchaseToken: 'token',
      startTimeMillis: '0',
      expiryTimeMillis: '0',
      autoRenewing: false,
      priceCurrencyCode: 'USD',
      priceAmountMicros: '0',
      countryCode: 'US',
      developerPayload: '',
      cancelReason: 0,
      orderId: 'order',
      purchaseType: 0,
      acknowledgementState: 0,
      kind: '',
    } as ValidateReceiptIAP);
    jest.spyOn(services, 'getPurchaseData').mockResolvedValue({
      isValid: true,
      firstPurchaseItem: mockPurchaseData,
    });
    jest
      .spyOn(controller, 'acknowledgeSubscription')
      .mockResolvedValue(undefined);
    jest.spyOn(validation, 'validateBody').mockImplementation((body) => body);

    const req = mockRequest({
      platform: 'ANDROID',
      receipt: {
        subscription: true,
        purchaseToken: 'token',
        packageName: 'pkg',
      },
    });
    const res = mockResponse();

    await validateProductPurchase(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      valid: true,
      data: {
        platform: 'ANDROID',
        ...mockPurchaseData,
      },
    });
  });
});
