# IAP Validator

API for validating Google Play In-App Purchases (IAP) using Google APIs.

## Features

- Validates Android in-app purchases and subscriptions
- JWT authentication protection
- Built with TypeScript and Express
- Environment configuration with dotenv
- Google Play Store API integration
- Subscription acknowledgement support

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
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key\n-----END PRIVATE KEY-----\n"
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

## License

ISC

This README provides a comprehensive overview of your project, including setup instructions, API documentation, and key technologies used. Let me know if you'd like any sections expanded or modified!
