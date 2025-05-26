import iap from 'in-app-purchase';
import { env } from './env';

const iapTestMode = env.IAP_TEST_MODE === 'true';

function initializeIAP() {
  // https://www.appypie.com/faqs/how-can-i-get-shared-secret-key-for-in-app-purchase
  iap.config({
    // If you want to exclude old transaction, set this to true. Default is false:
    appleExcludeOldTransactions: true,
    // this comes from iTunes Connect (You need this to valiate subscriptions):
    applePassword: env.APPLE_SHARED_SECRET,

    googleServiceAccount: {
      clientEmail: env.GOOGLE_CLIENT_EMAIL,
      privateKey: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },

    /* Configurations all platforms */
    test: iapTestMode, // For Apple and Google Play to force Sandbox validation only
    // verbose: true, // Output debug logs to stdout stream
  });

  return { iap };
}

export { initializeIAP };
