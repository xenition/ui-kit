/** @jest-environment jsdom */
/**
 * Web marketplace components (React DOM): render smoke, `--xen-*` token-class
 * presence (no literal colors), and the behavioral contracts that mirror the
 * native suite — make offer, place bid, watch toggle, offer accept, radio
 * select, and the empty state.
 */
import { render, fireEvent } from '@testing-library/react';
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

describe('ListingCard (web)', () => {
  it('renders title + price, fires onClick, and the watch toggle stays off the card target', () => {
    const onClick = jest.fn();
    const onToggleWatch = jest.fn();
    const { getByText, getByLabelText, getByRole } = render(
      <ListingCard
        title="Vintage film camera"
        priceCents={12500}
        condition="used"
        subtitle="Brooklyn · 2mi"
        watched={false}
        onToggleWatch={onToggleWatch}
        onClick={onClick}
      />
    );
    expect(getByText('Vintage film camera')).toBeTruthy();
    expect(getByText('$125.00')).toBeTruthy();
    // Interactive card = role="button" with token classes.
    const card = getByRole('button', { name: /Vintage film camera, \$125\.00/ });
    expect(card.className).toContain('bg-surface');
    expect(card.className).toContain('border-border');
    // Watch toggle fires without triggering the card press.
    fireEvent.click(getByLabelText('Watch Vintage film camera'));
    expect(onToggleWatch).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
    // Keyboard activation on the card.
    fireEvent.keyDown(card, { key: 'Enter' });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a loading recap', () => {
    const { getByText } = render(<ListingCard title="X" priceCents={100} loading />);
    expect(getByText('Loading listing…')).toBeTruthy();
  });
});

describe('MakeOfferForm (web, make offer)', () => {
  it('parses the entered amount to cents and submits', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = render(<MakeOfferForm listPriceCents={20000} onSubmit={onSubmit} />);
    fireEvent.change(getByTestId('xen-mkt-offer-amount'), { target: { value: '150' } });
    fireEvent.click(getByText('Send offer'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toBe(15000);
  });

  it('blocks submit below the minimum offer and shows an inline error', () => {
    const onSubmit = jest.fn();
    const { getByTestId, getByText } = render(<MakeOfferForm minOfferCents={10000} onSubmit={onSubmit} />);
    fireEvent.change(getByTestId('xen-mkt-offer-amount'), { target: { value: '50' } });
    fireEvent.click(getByText('Send offer'));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(getByText(/at least \$100\.00/)).toBeTruthy();
  });
});

describe('AuctionCard (web, place bid)', () => {
  const now = 1_000_000;

  it('renders the current bid + countdown and fires onPlaceBid while live', () => {
    const onPlaceBid = jest.fn();
    const { getByText } = render(
      <AuctionCard
        title="Signed poster"
        currentBidCents={4200}
        bidCount={7}
        endsAtMs={now + 2 * 3600 * 1000 + 30 * 60 * 1000}
        nowMs={now}
        onPlaceBid={onPlaceBid}
      />
    );
    expect(getByText('$42.00')).toBeTruthy();
    expect(getByText('7 bids')).toBeTruthy();
    expect(getByText('⏱ 2h 30m')).toBeTruthy();
    fireEvent.click(getByText('Place bid'));
    expect(onPlaceBid).toHaveBeenCalledTimes(1);
  });

  it('disables bidding once ended', () => {
    const onPlaceBid = jest.fn();
    const { getByText } = render(
      <AuctionCard title="Lot" currentBidCents={100} endsAtMs={now - 1000} nowMs={now} onPlaceBid={onPlaceBid} />
    );
    const btn = getByText('Auction ended') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    fireEvent.click(btn);
    expect(onPlaceBid).not.toHaveBeenCalled();
  });
});

describe('OfferRow (web)', () => {
  it('shows Accept/Decline only for pending and fires accept', () => {
    const onAccept = jest.fn();
    const { getByText } = render(
      <OfferRow party="Jules" amountCents={9000} status="pending" onAccept={onAccept} onDecline={() => {}} />
    );
    expect(getByText('Pending')).toBeTruthy();
    fireEvent.click(getByText('Accept'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('hides actions once accepted', () => {
    const { getByText, queryByText } = render(
      <OfferRow party="Jules" amountCents={9000} status="accepted" onAccept={() => {}} />
    );
    expect(getByText('Accepted')).toBeTruthy();
    expect(queryByText('Accept')).toBeNull();
  });
});

describe('WatchlistRow (web, watch toggle)', () => {
  it('fires the toggle without triggering the row press', () => {
    const onToggleWatch = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText } = render(
      <WatchlistRow title="Retro chair" priceCents={8000} watched onToggleWatch={onToggleWatch} onClick={onClick} />
    );
    fireEvent.click(getByLabelText('Remove Retro chair from watchlist'));
    expect(onToggleWatch).toHaveBeenCalledWith(false);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('ShippingOption (web)', () => {
  it('is a radio button, reflects selection, and fires onSelect', () => {
    const onSelect = jest.fn();
    const { getByRole } = render(
      <ShippingOption label="Express" priceCents={999} eta="1–2 days" glyph="⚡" selected onSelect={onSelect} />
    );
    const radio = getByRole('radio', { name: /Express, \$9\.99, 1–2 days/ });
    expect(radio.getAttribute('aria-checked')).toBe('true');
    expect(radio.className).toContain('border-primary');
    fireEvent.click(radio);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});

describe('BidRow (web)', () => {
  it('marks the leading bid with a token-tinted surface and a badge', () => {
    const { getByText, getByLabelText } = render(
      <BidRow bidder="b***7" amountCents={4200} leading rank={1} timeLabel="1m ago" />
    );
    expect(getByText('Leading')).toBeTruthy();
    const row = getByLabelText(/Leading bid, b\*\*\*7/);
    expect(row.className).toContain('border-success');
  });
});

describe('CategoryTile (web)', () => {
  it('reflects the selected filter via aria-pressed + token ring', () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <CategoryTile label="Electronics" glyph="📷" count={1200} selected onClick={onClick} />
    );
    const tile = getByRole('button', { name: /Electronics, 1,200 items/ });
    expect(tile.getAttribute('aria-pressed')).toBe('true');
    expect(tile.className).toContain('border-primary');
    fireEvent.click(tile);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('SellerCard (web)', () => {
  it('renders name, verified badge, and fires contact', () => {
    const onContact = jest.fn();
    const { getByText } = render(
      <SellerCard name="Corner Shop" rating={4.5} reviewCount={210} salesCount={1300} verified onContact={onContact} />
    );
    expect(getByText('Corner Shop')).toBeTruthy();
    expect(getByText('✓ Verified')).toBeTruthy();
    fireEvent.click(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });
});

describe('ConditionBadge (web)', () => {
  it('humanizes the condition grade as text (not color alone)', () => {
    const { getByText } = render(<ConditionBadge condition="like-new" />);
    expect(getByText('Like New')).toBeTruthy();
  });
});

describe('RatingBreakdown (web)', () => {
  it('renders a per-star distribution and guards the empty case', () => {
    const { getByLabelText } = render(<RatingBreakdown counts={{ 5: 120, 4: 30, 3: 8, 2: 2, 1: 1 }} />);
    expect(getByLabelText('5 stars, 120 ratings')).toBeTruthy();

    const { getByLabelText: emptyLabel } = render(<RatingBreakdown counts={[]} />);
    expect(emptyLabel('1 stars, 0 ratings')).toBeTruthy();
  });
});

describe('ReportListing (web)', () => {
  const REASONS: ReportReason[] = [
    { id: 'spam', label: 'Spam or scam' },
    { id: 'prohibited', label: 'Prohibited item', requiresDetails: true },
  ];

  it('requires a reason (and details when flagged) before submitting', () => {
    const onSubmit = jest.fn();
    const { getByLabelText, getByTestId, getByText } = render(
      <ReportListing reasons={REASONS} onSubmit={onSubmit} />
    );
    fireEvent.click(getByText('Submit report'));
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.click(getByLabelText('Prohibited item'));
    fireEvent.click(getByText('Submit report'));
    expect(onSubmit).not.toHaveBeenCalled();
    fireEvent.change(getByTestId('xen-mkt-report-details'), { target: { value: 'counterfeit goods' } });
    fireEvent.click(getByText('Submit report'));
    expect(onSubmit).toHaveBeenCalledWith('prohibited', 'counterfeit goods');
  });

  it('renders an empty state when there are no reasons', () => {
    const { getByText } = render(<ReportListing reasons={[]} />);
    expect(getByText('No report reasons available')).toBeTruthy();
  });
});
