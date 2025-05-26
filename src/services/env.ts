import { z } from 'zod';

const envSchema = z.object({
  ANDROID_PACKAGE_NAME: z.string(),
  GOOGLE_PRIVATE_KEY: z.string(),
  GOOGLE_CLIENT_EMAIL: z.string(),
  PORT: z.string(),
  APPLE_SHARED_SECRET: z.string(),
  IAP_TEST_MODE: z.string().default('false'),
});

export const env = envSchema.parse(process.env);
