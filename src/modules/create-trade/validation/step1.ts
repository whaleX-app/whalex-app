import { z } from 'zod';

export const CoinSchema = z.object({
  name: z.string(),
  ticker: z.string(),
  network: z.string(),
  minimum: z.number(),
  maximum: z.number(),
});

export const CreateTradeStep1InputSchema = z.object({
  coinFrom: CoinSchema,
  amountFrom: z.number().optional(),
  coinTo: CoinSchema,
  amountTo: z.number().optional(),
});
