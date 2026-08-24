/**
 * Spec for the alternate marketplace designs (V2 / V3). Each variant is a
 * drop-in for its base component — same props, different layout — so these tests
 * assert three things per variant: it mounts and shows its core data, it stays
 * token-pure under BOTH seeds (every rendered hex traces to a compiled token,
 * the native mirror of the "no hardcoded color" rule), and its one primary
 * interaction fires. The base components already own their exhaustive specs in
 * `marketplace.native.spec.tsx`; this file guards the redesigns.
 */
import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { ListingCardV2 } from './ListingCardV2';
import { ListingCardV3 } from './ListingCardV3';
import { SellerCardV2 } from './SellerCardV2';
import { SellerCardV3 } from './SellerCardV3';
import { AuctionCardV2 } from './AuctionCardV2';
import { AuctionCardV3 } from './AuctionCardV3';
import { WatchlistRowV2 } from './WatchlistRowV2';
import { WatchlistRowV3 } from './WatchlistRowV3';

const NOW = 1_000_000;
const LIVE_END = NOW + 2 * 3600 * 1000 + 30 * 60 * 1000; // 2h 30m out

describe('ListingCard alternates (native)', () => {
  it('V2 renders price + title and fires the watch toggle without navigating', () => {
    const onPress = jest.fn();
    const onToggleWatch = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ListingCardV2
        title="Vintage film camera"
        priceCents={12500}
        condition="used"
        subtitle="Brooklyn · 2mi"
        watched={false}
        onToggleWatch={onToggleWatch}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Vintage film camera')).toBeTruthy();
    expect(getByText('$125.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Watch Vintage film camera'));
    expect(onToggleWatch).toHaveBeenCalledWith(true);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('V3 renders over the scrim and fires onPress', () => {
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ListingCardV3 title="Signed poster" priceCents={4200} condition="new" subtitle="Ships free" onPress={onPress} />,
      SEED_DARK
    );
    expect(getByText('Signed poster')).toBeTruthy();
    expect(getByText('$42.00')).toBeTruthy();
    fireEvent.press(getByLabelText(/Signed poster, \$42\.00/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('SellerCard alternates (native)', () => {
  it('V2 renders the profile banner and fires contact', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <SellerCardV2 name="Corner Shop" rating={4.5} reviewCount={210} salesCount={1300} verified onContact={onContact} />,
      SEED_LIGHT
    );
    expect(getByText('Corner Shop')).toBeTruthy();
    expect(getByText('✓ Verified')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });

  it('V3 renders the trust line and fires the contact link', () => {
    const onContact = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <SellerCardV3 name="Ada's Goods" rating={4.8} salesCount={90} location="Berlin" verified onContact={onContact} />,
      SEED_DARK
    );
    expect(getByText("Ada's Goods")).toBeTruthy();
    expect(getByLabelText('Verified seller')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('AuctionCard alternates (native)', () => {
  it('V2 shows the countdown band + current bid and fires onPlaceBid while live', () => {
    const onPlaceBid = jest.fn();
    const { getByText } = renderThemed(
      <AuctionCardV2 title="Lot 12" currentBidCents={4200} bidCount={7} endsAtMs={LIVE_END} nowMs={NOW} onPlaceBid={onPlaceBid} />,
      SEED_LIGHT
    );
    expect(getByText('$42.00')).toBeTruthy();
    expect(getByText('⏱ 2h 30m left')).toBeTruthy();
    fireEvent.press(getByText('Place bid'));
    expect(onPlaceBid).toHaveBeenCalledTimes(1);
  });

  it('V3 shows the inline ledger and blocks bidding once ended', () => {
    const onPlaceBid = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <AuctionCardV3 title="Lot 13" currentBidCents={100} bidCount={3} endsAtMs={NOW - 1000} nowMs={NOW} onPlaceBid={onPlaceBid} />,
      SEED_DARK
    );
    expect(getByText('$1.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Auction ended'));
    expect(onPlaceBid).not.toHaveBeenCalled();
  });
});

describe('WatchlistRow alternates (native)', () => {
  it('V2 shows the price-drop callout and fires the toggle without navigating', () => {
    const onToggleWatch = jest.fn();
    const onPress = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WatchlistRowV2
        title="Retro chair"
        priceCents={8000}
        compareAtCents={10000}
        condition="used"
        watched
        onToggleWatch={onToggleWatch}
        onPress={onPress}
      />,
      SEED_LIGHT
    );
    expect(getByText('Retro chair')).toBeTruthy();
    expect(getByText('▼ Save $20.00')).toBeTruthy();
    fireEvent.press(getByLabelText('Remove Retro chair from watchlist'));
    expect(onToggleWatch).toHaveBeenCalledWith(false);
    expect(onPress).not.toHaveBeenCalled();
  });

  it('V3 renders the minimal line and fires the toggle', () => {
    const onToggleWatch = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <WatchlistRowV3 title="Desk lamp" priceCents={3500} condition="new" watched onToggleWatch={onToggleWatch} />,
      SEED_DARK
    );
    expect(getByText('Desk lamp')).toBeTruthy();
    fireEvent.press(getByLabelText('Remove Desk lamp from watchlist'));
    expect(onToggleWatch).toHaveBeenCalledWith(false);
  });
});

describe('token purity (native marketplace alternates, both seeds)', () => {
  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const { root } = renderThemed(
        <>
          <ListingCardV2 title="Camera" priceCents={12500} compareAtCents={15000} condition="used" subtitle="Brooklyn" watched onToggleWatch={() => {}} onPress={() => {}} />
          <ListingCardV2 title="Loading" priceCents={100} loading />
          <ListingCardV3 title="Poster" priceCents={4200} compareAtCents={6000} condition="new" subtitle="Ships free" imageUrl="x.jpg" watched onToggleWatch={() => {}} onPress={() => {}} />
          <ListingCardV3 title="No photo" priceCents={900} loading />
          <SellerCardV2 name="Corner Shop" rating={4.5} reviewCount={210} salesCount={1300} location="NYC" verified onContact={() => {}} onPress={() => {}} />
          <SellerCardV2 name="Bare" />
          <SellerCardV3 name="Ada's Goods" rating={4.8} reviewCount={30} salesCount={90} location="Berlin" verified onContact={() => {}} onPress={() => {}} />
          <SellerCardV3 name="Solo" />
          <AuctionCardV2 title="Live lot" currentBidCents={4200} bidCount={7} endsAtMs={LIVE_END} nowMs={NOW} imageUrl="x.jpg" onPlaceBid={() => {}} />
          <AuctionCardV2 title="Ended lot" currentBidCents={100} bidCount={1} endsAtMs={NOW - 1000} nowMs={NOW} variant="compact" onPlaceBid={() => {}} />
          <AuctionCardV3 title="Inline live" currentBidCents={4200} bidCount={7} endsAtMs={LIVE_END} nowMs={NOW} onPlaceBid={() => {}} />
          <AuctionCardV3 title="Inline ended" currentBidCents={100} bidCount={0} endsAtMs={NOW - 1000} nowMs={NOW} onPlaceBid={() => {}} />
          <WatchlistRowV2 title="Retro chair" priceCents={8000} compareAtCents={10000} condition="used" watched onToggleWatch={() => {}} onPress={() => {}} />
          <WatchlistRowV2 title="Sold chair" priceCents={8000} ended watched onToggleWatch={() => {}} />
          <WatchlistRowV3 title="Desk lamp" priceCents={3500} compareAtCents={5000} condition="new" watched onToggleWatch={() => {}} onPress={() => {}} />
          <WatchlistRowV3 title="Sold lamp" priceCents={3500} ended watched onToggleWatch={() => {}} />
        </>,
        seed
      );
      const allowed = tokenHexSet(seed);
      const found = renderedStyleHexes(root);
      expect(found.length).toBeGreaterThan(0);
      found.forEach((hex) => expect(allowed.has(hex)).toBe(true));
    });
  });
});
