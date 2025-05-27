import { z } from 'zod';
import type { Platform, Receipt } from '../types';

type ValidateBodyRequest = {
  platform: Platform;
  receipt: Receipt;
};

export function validateBody({ platform, receipt }: ValidateBodyRequest) {
  const baseSchema = z.object({
    platform: z.enum(['ANDROID', 'IOS']),
    receipt: z.object({
      packageName: z.string(),
      productId: z.string(),
      purchaseToken: z.string(),
      subscription: z.boolean(),
    }),
  });

  return baseSchema.parse({ platform, receipt });
}
