import { OfferRateType, TradeMode } from '@generated/gql';
import { OffersTable } from '@modules/create-trade/components/OffersTable';
import { RateTypeRadioGroup } from '@modules/create-trade/components/RateTypeRadioGroup';
import { fireEvent, render, screen } from '@testing-library/react-native';

describe('OffersTable', () => {
  const offers = [
    { provider: 'Swapuz', amount: 5, insurance: 50, kycRating: 'a', rateType: OfferRateType.Fixed, waste: 5 },
    {
      provider: 'LetsExchange',
      amount: 7,
      insurance: 20,
      kycRating: 'b',
      rateType: OfferRateType.Floating,
      waste: 15,
    },
    {
      provider: 'Exch',
      amount: 9,
      insurance: 50,
      kycRating: 'c',
      rateType: OfferRateType.Fixed,
      waste: 25,
    },
    {
      provider: 'LocalMonero',
      amount: 9,
      insurance: 50,
      kycRating: 'c',
      rateType: OfferRateType.Floating,
      waste: 55,
    },
  ];

  it('renders offers with fixed rates', () => {
    render(
      <OffersTable offers={offers} selectedOffer={offers[0]} tradeMode={TradeMode.Standard} onSelect={() => {}} />
    );

    fireEvent(screen.UNSAFE_getByType(RateTypeRadioGroup), 'onSelect', OfferRateType.Fixed);

    expect(screen.findByText('Swapuz')).toBeTruthy();
    expect(screen.findByText('Exch')).toBeTruthy();
    expect(screen.queryAllByText('LetsExchange')).toHaveLength(0);
  });

  it('renders offers with floating rates', () => {
    render(
      <OffersTable offers={offers} selectedOffer={offers[0]} tradeMode={TradeMode.Standard} onSelect={() => {}} />
    );

    expect(screen.findByText('LetsExchange')).toBeTruthy();
    expect(screen.findByText('LocalMonero')).toBeTruthy();
    expect(screen.queryAllByText('Swapuz')).toHaveLength(0);
  });

  it('renders all offers in payment mode', () => {
    render(<OffersTable offers={offers} selectedOffer={offers[0]} tradeMode={TradeMode.Payment} onSelect={() => {}} />);

    expect(screen.findByText('Swapuz')).toBeTruthy();
    expect(screen.findByText('LetsExchange')).toBeTruthy();
    expect(screen.findByText('Exch')).toBeTruthy();
    expect(screen.UNSAFE_queryAllByType(RateTypeRadioGroup)).toHaveLength(0);
  });

  it('triggers onSelect event', () => {
    const onSelect = jest.fn();

    render(
      <OffersTable offers={offers} selectedOffer={offers[0]} tradeMode={TradeMode.Standard} onSelect={onSelect} />
    );

    fireEvent(screen.UNSAFE_getByType(RateTypeRadioGroup), 'onSelect', OfferRateType.Fixed);
    fireEvent.press(screen.getByText('Swapuz'));

    expect(onSelect).toHaveBeenCalledWith(offers[0]);
  });
});
