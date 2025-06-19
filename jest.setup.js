require('dotenv').config();

jest.mock('./src/services/env', () => ({
  env: {
    GOOGLE_PRIVATE_KEY: 'dummy',
    GOOGLE_CLIENT_EMAIL: 'dummy',
    PORT: '3000',
    APPLE_SHARED_SECRET: 'dummy',
    IAP_TEST_MODE: 'true',
    JWT_TOKEN: 'dummy',
  },
}));
