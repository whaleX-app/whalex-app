import { OfferRateType } from '@generated/gql';
import { z } from 'zod';

export const CreateTradeStep2InputSchema = z.object({
  receiveAddress: z.string().min(1, 'validation.receiveAddressRequired'),
  refundAddress: z.string().optional(),
  selectedOffer: z.object(
    {
      amount: z.number(),
      insurance: z.number(),
      kycRating: z.string(),
      provider: z.string(),
      rateType: z.nativeEnum(OfferRateType),
    },
    { required_error: 'validation.selectedOfferRequired' }
  ),
});
