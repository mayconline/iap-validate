import iap from 'in-app-purchase';
import { env } from './env';
import type { PurchaseData, Receipt, ValidateReceiptIAP } from '../types';

const iapTestMode = env.IAP_TEST_MODE === 'true';

function initializeIAP() {
  try {
    // https://www.appypie.com/faqs/how-can-i-get-shared-secret-key-for-in-app-purchase
    iap.config({
      // If you want to exclude old transaction, set this to true. Default is false:
      //appleExcludeOldTransactions: true,
      // this comes from iTunes Connect (You need this to valiate subscriptions):
      // applePassword: env.APPLE_SHARED_SECRET,

      googleServiceAccount: {
        clientEmail: env.GOOGLE_CLIENT_EMAIL,
        privateKey: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },

      /* Configurations all platforms */
      test: iapTestMode, // For Apple and Google Play to force Sandbox validation only
      // verbose: true, // Output debug logs to stdout stream
    });

    return { iap };
  } catch (error) {
    throw new Error(
      `Failed to initialize In-App Purchase module: ${error || 'Unknown error'}`
    );
  }
}

async function validateReceipt(
  receipt: Receipt,
  iap: any
): Promise<ValidateReceiptIAP> {
  if (!receipt || !iap) {
    throw new Error('Receipt and IAP module are required for validation');
  }

  try {
    return await iap.validate(receipt);
  } catch (error: any) {
    throw new Error(`Receipt validation failed: ${error || 'Unknown error'}`);
  }
}

async function getPurchaseData(validateReceipt: any, iap: any) {
  if (!validateReceipt || !iap) {
    throw new Error(
      'validateReceipt and IAP module are required for validation'
    );
  }

  try {
    const purchaseData: PurchaseData[] = await iap.getPurchaseData(
      validateReceipt
    );

    if (!purchaseData?.length) {
      throw new Error('No purchase data found');
    }

    return {
      isValid: !!purchaseData[0],
      firstPurchaseItem: purchaseData[0],
    };
  } catch (error: any) {
    throw new Error(`Failed to get purchase data: ${error || 'Unknown error'}`);
  }
}

export { initializeIAP, validateReceipt, getPurchaseData };
