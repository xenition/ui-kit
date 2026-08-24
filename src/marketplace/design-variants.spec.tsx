/** @jest-environment jsdom */
/**
 * Alternate marketplace designs (v2 / v3) for the web (React DOM) — drop-in
 * redesigns of AuctionCard, ListingCard, SellerCard, WatchlistRow. Each variant
 * keeps the base props, so these specs prove they (a) mount, (b) stay token-pure
 * (no literal hex in inline styles), and (c) honor a key interaction/state.
 */
import { fireEvent, render } from '@testing-library/react';
import { AuctionCardV2 } from './AuctionCardV2';
import { AuctionCardV3 } from './AuctionCardV3';
import { ListingCardV2 } from './ListingCardV2';
import { ListingCardV3 } from './ListingCardV3';
import { SellerCardV2 } from './SellerCardV2';
import { SellerCardV3 } from './SellerCardV3';
import { WatchlistRowV2 } from './WatchlistRowV2';
import { WatchlistRowV3 } from './WatchlistRowV3';

const HEX_LITERAL = /#[0-9a-fA-F]{3,8}\b/;
const inlineStyles = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll<HTMLElement>('[style]'))
    .map((el) => el.getAttribute('style') ?? '')
    .join('\n');

const NOW = 1_000_000_000_000;

describe('AuctionCard alternates (web)', () => {
  it('V2 renders and fires onPlaceBid', () => {
    const onPlaceBid = jest.fn();
    const { getByText, container } = render(
      <AuctionCardV2 title="Vintage lamp" currentBidCents={4500} bidCount={7} endsAtMs={NOW + 3_600_000} nowMs={NOW} onPlaceBid={onPlaceBid} />
    );
    expect(getByText('Vintage lamp')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Place bid'));
    expect(onPlaceBid).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a dense row', () => {
    const { getByText, container } = render(
      <AuctionCardV3 title="Old clock" currentBidCents={9900} bidCount={3} endsAtMs={NOW + 86_400_000} nowMs={NOW} />
    );
    expect(getByText('Old clock')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('ListingCard alternates (web)', () => {
  it('V2 toggles watch without navigating', () => {
    const onToggleWatch = jest.fn();
    const onClick = jest.fn();
    const { getByLabelText, container } = render(
      <ListingCardV2 title="Sofa" priceCents={12000} condition="used" onToggleWatch={onToggleWatch} onClick={onClick} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Watch'));
    expect(onToggleWatch).toHaveBeenCalledWith(true);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('V3 fires onClick', () => {
    const onClick = jest.fn();
    const { getByText, container } = render(<ListingCardV3 title="Chair" priceCents={3000} onClick={onClick} />);
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Chair'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('SellerCard alternates (web)', () => {
  it('V2 fires onContact', () => {
    const onContact = jest.fn();
    const { getByText, container } = render(
      <SellerCardV2 name="Ada's Shop" rating={4.6} reviewCount={220} salesCount={1500} verified onContact={onContact} />
    );
    expect(getByText("Ada's Shop")).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByText('Contact'));
    expect(onContact).toHaveBeenCalledTimes(1);
  });

  it('V3 renders a compact row', () => {
    const { getByText, container } = render(<SellerCardV3 name="Leo Store" rating={4.9} salesCount={80} />);
    expect(getByText('Leo Store')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});

describe('WatchlistRow alternates (web)', () => {
  it('V2 toggles watch', () => {
    const onToggleWatch = jest.fn();
    const { getByLabelText, container } = render(
      <WatchlistRowV2 title="Bike" priceCents={20000} compareAtCents={25000} watched onToggleWatch={onToggleWatch} />
    );
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
    fireEvent.click(getByLabelText('Unwatch'));
    expect(onToggleWatch).toHaveBeenCalledWith(false);
  });

  it('V3 renders a dense line', () => {
    const { getByText, container } = render(<WatchlistRowV3 title="Skis" priceCents={8000} ended />);
    expect(getByText('Skis')).toBeTruthy();
    expect(inlineStyles(container)).not.toMatch(HEX_LITERAL);
  });
});
