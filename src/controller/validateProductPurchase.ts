import { initializeIAP } from '../services';
import { validateSubscription } from '.';
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

    // await iap.setup();
    // const validationResponse: any = await iap.validate(receipt);

    // const purchaseData = iap.getPurchaseData(validationResponse);

    // if (!purchaseData?.length) {
    //   return response.status(400).json({
    //     valid: false,
    //     error: 'No purchase data found',
    //   });
    // }

    // const firstPurchaseItem = purchaseData[0];
    // const isValid = !!firstPurchaseItem;

    // if (platform === 'android') {
    //   await validateSubscription({
    //     platform,
    //     acknowledgementState: validationResponse.acknowledgementState,
    //     productId: firstPurchaseItem.productId,
    //     purchaseToken: receipt.purchaseToken,
    //     packageName: receipt.packageName,
    //   });
    // }

    // const formattedPurchase = {
    //   platform,
    //   isValid,
    //   ...firstPurchaseItem,
    // };

    // return response.status(200).json({
    //   valid: isValid,
    //   data: formattedPurchase,
    // });

    return response.status(200).json({
      valid: true,
      message: 'Product purchase validation is not implemented yet.',
      platform,
      receipt,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return response.status(400).json({
        valid: false,
        error: error.errors,
      });
    }
  }
}
