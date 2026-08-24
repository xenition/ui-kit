import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import {
  SEED_LIGHT,
  SEED_DARK,
  renderThemed,
  renderedStyleHexes,
  tokenHexSet,
} from '../spec-support/render-native';
import { ListingCard } from './ListingCard';
import { SellerCard } from './SellerCard';
import { OfferRow } from './OfferRow';
import { BidRow } from './BidRow';
import { AuctionCard } from './AuctionCard';
import { CategoryTile } from './CategoryTile';
import { ConditionBadge } from './ConditionBadge';
import { ShippingOption } from './ShippingOption';
import { MakeOfferForm } from './MakeOfferForm';
import { WatchlistRow } from './WatchlistRow';
import { RatingBreakdown } from './RatingBreakdown';
import { ReportListing, type ReportReason } from './ReportListing';

describe('ListingCard (native)', () => {
  it('renders title + price and fires onPress and the watch toggle', () => {
    const onPress = jest.fn();
    const onToggleWatch = jest.fn();
    const { getByText, getByLabelText } = renderThemed(
      <ListingCard
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
    // Watch toggle is outside the card press target.
    fireEvent.press(getByLabelText('Watch Vintage film camera'));
    expect(onToggleWatch).toHaveBeenCalledWith(true);
    expect(onPress).not.toHaveBeenCalled();
    fireEvent.press(getByLabelText(/Vintage film camera, \$125\.00/));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders a loading recap', () => {
    const { getByText } = renderThemed(
      <ListingCard title="X" priceCents={100} loading />,
      SEED_DARK
    );
    expect(getByText('Loading listing…')).toBeTruthy();
  });
});

describe('SellerCard (native)', () => {
  it('renders name, verified badge, and fires contact', () => {
    const onContact = jest.fn();
    const { getByText } = renderThemed(
      <SellerCard name="Corner Shop" rating={4.5} reviewCount={210} salesCount={1300} verified onContact={onContact} />,
      SEED_DARK
    );
    expect(getByText('Corner Shop')).toBeTruthy();
    expect(getByText('✓ Verified')).toBeTruthy();
    fireEvent.press(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('OfferRow (native)', () => {
  it('shows Accept/Decline only for pending and fires accept', () => {
    const onAccept = jest.fn();
    const { getByText } = renderThemed(
      <OfferRow party="Jules" amountCents={9000} status="pending" onAccept={onAccept} onDecline={() => {}} />,
      SEED_LIGHT
    );
    expect(getByText('Pending')).toBeTruthy();
    fireEvent.press(getByText('Accept'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('hides actions once accepted', () => {
    const { queryByText, getByText } = renderThemed(
      <OfferRow party="Jules" amountCents={9000} status="accepted" onAccept={() => {}} />,
      SEED_DARK
    );
    expect(getByText('Accepted')).toBeTruthy();
    expect(queryByText('Accept')).toBeNull();
  });
});

describe('AuctionCard (native, place bid)', () => {
  it('renders the current bid + countdown and fires onPlaceBid while live', () => {
    const onPlaceBid = jest.fn();
    const now = 1_000_000;
    const { getByText } = renderThemed(
      <AuctionCard
        title="Signed poster"
        currentBidCents={4200}
        bidCount={7}
        endsAtMs={now + 2 * 3600 * 1000 + 30 * 60 * 1000}
        nowMs={now}
        onPlaceBid={onPlaceBid}
      />,
      SEED_LIGHT
    );
    expect(getByText('$42.00')).toBeTruthy();
    expect(getByText('7 bids')).toBeTruthy();
    expect(getByText('⏱ 2h 30m')).toBeTruthy();
    fireEvent.press(getByText('Place bid'));
    expect(onPlaceBid).toHaveBeenCalledTimes(1);
  });

  it('disables bidding once ended', () => {
    const onPlaceBid = jest.fn();
    const now = 1_000_000;
    const { getByText } = renderThemed(
      <AuctionCard title="Lot" currentBidCents={100} endsAtMs={now - 1000} nowMs={now} onPlaceBid={onPlaceBid} />,
      SEED_DARK
    );
    fireEvent.press(getByText('Auction ended'));
    expect(onPlaceBid).not.toHaveBeenCalled();
  });
});

describe('MakeOfferForm (native, make offer)', () => {
  it('parses the entered amount to cents and submits', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = renderThemed(
      <MakeOfferForm listPriceCents={20000} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    fireEvent.changeText(getByTestId('xen-mkt-offer-amount'), '150');
    fireEvent.press(getByText('Send offer'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBe(15000);
  });

  it('blocks submit below the minimum offer', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = renderThemed(
      <MakeOfferForm minOfferCents={10000} onSubmit={onSubmit} />,
      SEED_DARK
    );
    fireEvent.changeText(getByTestId('xen-mkt-offer-amount'), '50');
    fireEvent.press(getByText('Send offer'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText(/at least \$100\.00/)).toBeTruthy();
  });
});

describe('WatchlistRow (native, watch toggle)', () => {
  it('fires the toggle without triggering the row press', () => {
    const onToggleWatch = jest.fn();
    const onPress = jest.fn();
    const { getByLabelText } = renderThemed(
      <WatchlistRow title="Retro chair" priceCents={8000} watched onToggleWatch={onToggleWatch} onPress={onPress} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Remove Retro chair from watchlist'));
    expect(onToggleWatch).toHaveBeenCalledWith(false);
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('ReportListing (native)', () => {
  const REASONS: ReportReason[] = [
    { id: 'spam', label: 'Spam or scam' },
    { id: 'prohibited', label: 'Prohibited item', requiresDetails: true },
  ];

  it('requires a reason (and details when flagged) before submitting', () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByTestId, getByText } = renderThemed(
      <ReportListing reasons={REASONS} onSubmit={onSubmit} />,
      SEED_LIGHT
    );
    // No reason yet → disabled submit does nothing.
    fireEvent.press(getByText('Submit report'));
    expect(onSubmit).not.toHaveBeenCalled();
    // Reason requiring details, still blocked until details are filled.
    fireEvent.press(getByLabelText('Prohibited item'));
    fireEvent.press(getByText('Submit report'));
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.changeText(getByTestId('xen-mkt-report-details'), 'counterfeit goods');
    fireEvent.press(getByText('Submit report'));
    expect(onSubmit).toHaveBeenCalledWith('prohibited', 'counterfeit goods');
  });

  it('renders an empty state when there are no reasons', () => {
    const { getByText } = renderThemed(<ReportListing reasons={[]} />, SEED_DARK);
    expect(getByText('No report reasons available')).toBeTruthy();
  });
});

describe('ConditionBadge (native)', () => {
  it('humanizes the condition grade as text (not color alone)', () => {
    const { getByText } = renderThemed(<ConditionBadge condition="like-new" />, SEED_LIGHT);
    expect(getByText('Like New')).toBeTruthy();
  });
});

describe('token purity (native marketplace, both seeds)', () => {
  const REASONS: ReportReason[] = [{ id: 'spam', label: 'Spam' }];

  it('every rendered hex traces to a compiled token', () => {
    [SEED_LIGHT, SEED_DARK].forEach((seed) => {
      const now = 1_000_000;
      const { root } = renderThemed(
        <>
          <ListingCard title="Camera" priceCents={12500} condition="used" watched onToggleWatch={() => {}} onPress={() => {}} />
          <ListingCard title="Loading" priceCents={100} loading />
          <SellerCard name="Corner Shop" rating={4.5} reviewCount={210} salesCount={1300} verified onContact={() => {}} />
          <OfferRow party="Jules" amountCents={9000} status="pending" note="Can you do less?" onAccept={() => {}} onDecline={() => {}} onCounter={() => {}} />
          <OfferRow party="Ada" amountCents={7000} status="declined" />
          <BidRow bidder="b***7" amountCents={4200} leading rank={1} timeLabel="1m ago" />
          <BidRow bidder="you" amountCents={4000} isYou rank={2} />
          <AuctionCard title="Poster" currentBidCents={4200} bidCount={7} endsAtMs={now + 90000000} nowMs={now} imageUrl="x.jpg" onPlaceBid={() => {}} />
          <AuctionCard title="Ended" currentBidCents={100} endsAtMs={now - 1000} nowMs={now} variant="compact" onPlaceBid={() => {}} />
          <CategoryTile label="Electronics" glyph="📷" count={1200} selected onPress={() => {}} />
          <CategoryTile label="Home" glyph="🛋" variant="chip" />
          <ConditionBadge condition="new" />
          <ConditionBadge condition="refurb" variant="outline" />
          <ShippingOption label="Express" priceCents={999} eta="1–2 days" glyph="⚡" selected onSelect={() => {}} />
          <ShippingOption label="Pickup" eta="Free local" onSelect={() => {}} />
          <MakeOfferForm listPriceCents={20000} minOfferCents={5000} withMessage onSubmit={() => {}} />
          <WatchlistRow title="Retro chair" priceCents={8000} compareAtCents={10000} condition="used" watched ended onToggleWatch={() => {}} onPress={() => {}} />
          <RatingBreakdown counts={{ 5: 120, 4: 30, 3: 8, 2: 2, 1: 1 }} />
          <RatingBreakdown counts={[]} />
          <ReportListing reasons={REASONS} onCancel={() => {}} onSubmit={() => {}} />
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
