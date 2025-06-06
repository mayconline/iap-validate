import { getPurchaseData, initializeIAP, validateReceipt } from '../services';
import { acknowledgeSubscription } from '.';
import { validateBody } from '../validation';
import type { Request, Response } from 'express';
import { ZodError } from 'zod';

const { iap } = initializeIAP();

export async function validateProductPurchase(
  request: Request,
  response: Response
) {
  try {
    const { platform, receipt } = validateBody(request.body);

    await iap.setup();

    const validationResponse = await validateReceipt(receipt, iap);

    const { isValid, firstPurchaseItem } = await getPurchaseData(
      validationResponse,
      iap
    );

    if (platform === 'ANDROID' && receipt?.subscription) {
      await acknowledgeSubscription({
        acknowledgementState: validationResponse.acknowledgementState,
        productId: firstPurchaseItem.productId,
        purchaseToken: receipt.purchaseToken,
        packageName: receipt.packageName,
      });
    }

    const formattedPurchase = {
      platform,
      ...firstPurchaseItem,
    };

    return response.status(200).json({
      valid: isValid,
      data: formattedPurchase,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        valid: false,
        error: error.errors,
      });
    }

    return response.status(400).json({
      valid: false,
      error: error.message || 'Unknown validation error',
    });
  }
}
