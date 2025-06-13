# IAP Validator

API for validating Google Play In-App Purchases (IAP) using Google APIs.

## Features

- Validates Android in-app purchases and subscriptions
- JWT authentication protection
- Built with TypeScript and Express
- Environment configuration with dotenv
- Google Play Store API integration
- Subscription acknowledgement support
- Vercel hosting setup

## Prerequisites

- Node.js v22 or higher
- PNPM package manager
- Google Play Console service account credentials

## Installation

1. Clone the repository
2. Install dependencies:

```sh
pnpm install
```

3. Add variables

```sh
cp .env.example .env
```

Required environment variables:

```sh
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n" # note: with " "
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
PORT=3000
APPLE_SHARED_SECRET=your-shared-secret
IAP_TEST_MODE=true //for use sandbox
JWT_TOKEN=your-jwt-secret
```

## Usage

1. Development

```sh
pnpm dev
```

2. Production Build

```sh
pnpm build
pnpm start
```

## API Endpoints

1. Validate Purchase

```sh
POST /iap/validate-purchase
```

2. Headers:

```sh
Content-Type: application/json
Authorization: Bearer <jwt-token>
```

3. Request body:

```sh
{
  "platform": "ANDROID",
  "receipt": {
    "packageName": "com.yourapp",
    "productId": "your_product_id",
    "purchaseToken": "purchase_token_from_google_play",
    "subscription": true # if subscription true else false
  }
}
```

4. Example response:

```sh
{
  "valid": true,
  "data": {
    "platform": "ANDROID",
    "service": "google",
    "status": 0,
    "packageName": "com.yourapp",
    "productId": "your_product_id",
    "purchaseToken": "purchase_token",
    "startTimeMillis": 1748567329531,
    "expiryTimeMillis": 1748579961072,
    "autoRenewing": false,
    "priceCurrencyCode": "BRL",
    "priceAmountMicros": 215880000,
    "countryCode": "BR",
    "developerPayload": null,
    "cancelReason": 1,
    "orderId": "GPA.XXXX-XXXX-XXXX-XXXX",
    "purchaseType": 0,
    "acknowledgementState": 1,
    "kind": "androidpublisher#subscriptionPurchase",
    "transactionId": "transaction_token",
    "quantity": 1,
    "expirationDate": "1748579961072",
    "cancellationDate": "1748579961072"
  }
}
```

## Development Stack

- [Express](https://expressjs.com/) - Framework Node JS
- [Zod](https://zod.dev/) - Schema validation
- [googleapis](https://github.com/googleapis/google-api-nodejs-client) - Google APIs client
- [in-app-purchase](https://github.com/voltrue2/in-app-purchase) - IAP validation library
- [Biome](https://biomejs.dev/) - Code formatting and linting

## References

- [react-native-iap](https://github.com/hyochan/react-native-iap) - In-App Purchase Library for React Native
- [Developer Android Google](https://developer.android.com/google/play/billing/integrate?hl=pt-br#subscriptions) - Doc to integrate IAP
- [in-app-subscription-example](https://github.com/mifi/in-app-subscription-example) - Example integration
- [Vercel Node JS Setup](https://vercel.com/guides/using-express-with-vercel) - Doc for deploying Node JS on Vercel

## Vercel Hosting Setup Requirement

1. Config variables in vercel

```sh
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n  # note: without " "
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
PORT=3000
APPLE_SHARED_SECRET=your-shared-secret
IAP_TEST_MODE=false
JWT_TOKEN=your-jwt-secret

```

2. Keep structured folders

```sh

src/index.ts - export default app
api/index.ts - import app and export default app, important if vercel has been throw error "Error: No Output Directory named "api" found after the Build completed."
vercel.json - File for vercel know that it is a serverless function

```

## License

ISC
